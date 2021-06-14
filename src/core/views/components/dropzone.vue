<template>
  <div
    ref="wrapperEl"
    class="el-upload el-upload--text"
    :class="{'dragover': dragOver}"
    tabindex="0"
    @click.self="select"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragover="commonHandler"
    @drop="handleDrop"
  >
    <input
      ref="inputEl"
      type="file"
      style="display: none"
      :multiple="field.component.multiple || false"
      :disabled="field.component.disabled || false"
      v-bind="field.component.inputAtts || {}"
      @change="inputChange"
    >

    <div
      v-if="!files.length"
      ref="draggerEl"
      class="el-upload-dragger"
      :class="{'is-dragover': dragOver}"
      @click="select"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">Перетащите файлы сюда или <em>нажмите для загрузки</em></div>
    </div>

    <div
      v-else
      ref="draggerEl"
      class="el-upload-dragger images"
      :class="{'is-dragover': dragOver}"
      @click.self="select"
    >
      <suspense v-for="(image, i) in files" :key="i">
        <template #default>
          <DropzoneImage
            :value="image"
            :src-key="field.component.srcKey"
          />
        </template>
      </suspense>
    </div>

    <slot :files="files" :dragOver="dragOver" :select="select" />
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType, ref,
} from 'vue';
import type { DropzoneField, DropzoneError } from 'core/types/form/dropzone';
import DropzoneImage from 'core/views/components/dropzone-image.vue';
import { requestWrapper } from 'core/utils/request';

type ValueType = File | string | (File | string)[] | null;

type DragEvents = 'dragenter' | 'dragleave' | 'dragover' | 'drop';

export default defineComponent({
  name: 'Dropzone',
  components: { DropzoneImage },
  props: {
    /** Value of the dropzone. Use it to model or clear the input */
    value: {
      type: [String, Array, Object] as PropType<ValueType>,
      default: null,
    },

    field: {
      type: Object as PropType<DropzoneField>,
      required: true,
    },
  },
  emits: ['update:value', 'errors', 'textErrors', 'dragenter', 'dragleave', 'dragover', 'drop'],
  setup (props, context) {
    const values = ref<ValueType>(props.value);
    const dragOver = ref<boolean>(false);
    const inputEl = ref<HTMLInputElement>();
    const wrapperEl = ref<HTMLDivElement>();
    const draggerEl = ref<HTMLDivElement>();

    /** TODO: This still works incorrectly for valueKey and srcKey if they are different! */
    const uploadToBackend = async (newVal: (File|string)[]) => {
      const uploadedFiles = await Promise.all(newVal.map(async (file) => {
        if (!file) return null;
        if (!props.field.component.saveToBackend) return file;

        const res = await requestWrapper(file, props.field.component.saveToBackend);
        if (res.error) return null;

        if (props.field.component.valueKey) return res.data[props.field.component.valueKey];
        return res.data;
      }));

      return uploadedFiles.filter((file) => !!file);
    };

    const files = computed({
      get (): (File | string)[] {
        if (Array.isArray(values.value)) return values.value;
        if (values.value) return [values.value];
        return [];
      },
      async set (val: File | string | (File | string)[]) {
        let value;
        if (props.field.component.multiple) {
          value = Array.isArray(val)
            ? [...(files.value as File[]), ...(await uploadToBackend(val))]
            : await uploadToBackend([val]);
        } else {
          value = (await uploadToBackend([Array.isArray(val) ? val[0] || null : val]))?.[0] || null;
        }

        values.value = value;
        context.emit('update:value', value);
      },
    });

    const select = () => {
      inputEl.value?.click();
    };

    const toggleDragOver = (val: boolean) => {
      if (props.field.component.noDrop || props.field.component.disabled) return;
      dragOver.value = val;
    };

    const changeChildrenPointerEvents = (style: string) => {
      const wrapperChildren = (wrapperEl.value?.childNodes || []) as HTMLElement[];
      wrapperChildren.forEach((node) => {
        node.style.pointerEvents = style;
      });
    };

    const commonHandler = (event: Event) => {
      event.preventDefault();
      context.emit(event.type as DragEvents, event);
    };

    const getErrorTexts = (errors: DropzoneError[]): string => {
      let errStr = '';
      errors.forEach((err) => {
        const fileName = err.name ? `(${err.name})` : '';
        if (err.type === 'FormatsError') {
          errStr += `Неправильный формат файла ${fileName}`;
        } else if (err.type === 'MaxSizeError') {
          errStr += `Превышен максимальный размер файла ${fileName}. Максимум: ${err.allowed}Мб`;
        } else if (err.type === 'MaxAmountError') {
          errStr += `Максимальное количество загружаемых файлов: ${err.allowed}`;
        }
      });
      return errStr;
    };

    const upload = async (newFiles: File[]|null) => {
      if (!newFiles) {
        files.value = [];
      } else {
        const thisFiles = (files.value || []) as File[];
        const errors: DropzoneError[] = [];

        // Handle MaxAmountError and prevent all files from being uploaded if the
        // given amount of files is more than allowed
        if (props.field.componentmultiple && props.field.component.maxAmount
          && thisFiles.length + newFiles.length > props.field.component.maxAmount) {
          errors.push({
            type: 'MaxAmountError',
            value: thisFiles.length + newFiles.length,
            allowed: props.field.component.maxAmount,
          });
          context.emit('errors', errors);
          context.emit('textErrors', getErrorTexts(errors));
          return;
        }

        const passedFiles: File[] = [];
        newFiles.forEach((file) => {
          // Handle FormatsError - when single file is not in the list of allowed formats
          const formats = props.field.component.formats || [];
          if (formats && formats.length) {
            const format = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
            if (formats.indexOf(format) === -1) {
              errors.push({
                type: 'FormatsError',
                value: format,
                name: file.name,
                allowed: formats,
              });
              return;
            }
          }

          // Handle MaxSizeError - when single file is too heavy
          if (props.field.component.maxSize && file.size >= props.field.component.maxSize * 1024 * 1024) {
            errors.push({
              type: 'MaxSizeError',
              value: file.size,
              name: file.name,
              allowed: props.field.component.maxSize,
            });
            return;
          }

          passedFiles.push(file);
        });

        context.emit('errors', errors);
        context.emit('textErrors', getErrorTexts(errors));

        files.value = passedFiles;
      }
    };

    const handleDragEnter = (event: Event) => {
      toggleDragOver(true);
      commonHandler(event);
    };

    const handleDragLeave = (event: DragEvent) => {
      if (event.relatedTarget && !wrapperEl.value?.contains(event.relatedTarget as Node)) {
        toggleDragOver(false);
        commonHandler(event);
      }
    };

    const handleDrop = (event: DragEvent) => {
      toggleDragOver(false);
      commonHandler(event);

      if (props.field.component.noDrop || props.field.component.disabled) return;
      if (event.dataTransfer) upload(Array.from(event.dataTransfer.files));
      else upload([]);
    };

    const inputChange = ({ target }: {target: HTMLInputElement}) => {
      if (target.files && !props.field.component.disabled) upload(Array.from(target.files));
    };

    return {
      values,
      dragOver,
      files,
      inputEl,
      wrapperEl,
      draggerEl,
      upload,
      select,
      toggleDragOver,
      handleDragEnter,
      handleDragLeave,
      handleDrop,
      inputChange,
      commonHandler,
      changeChildrenPointerEvents,
    };
  },
});
</script>
