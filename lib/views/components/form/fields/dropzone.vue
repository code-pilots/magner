<template>
  <div
    ref="wrapperEl"
    class="el-upload el-upload--text"
    :class="{'dragover': dragOver && !disabled, disabled }"
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
      :multiple="field.props.multiple || false"
      :disabled="disabled || false"
      v-bind="field.props.inputAtts || {}"
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
      <div class="el-upload__text">
        {{ t('core.form.dropzone.drag_here') }} <em>{{ t('core.form.dropzone.click_upload') }}</em>
      </div>
    </div>

    <transition-group
      v-else
      ref="draggerEl"
      tag="div"
      name="field-group"
      class="el-upload-dragger images"
      :class="{'is-dragover': dragOver}"
      @click.self="select"
    >
      <suspense v-for="(image, i) in files" :key="i">
        <template #default>
          <DropzoneImage
            :model-value="image"
            :src-key="field.props.srcKey"
            :draggable="field.props.sortable"
            :loading="false"
            @dragstart="handleInnerDragStart(i)"
            @dragover="handleInnerDragOver(i)"
            @drop="handleInnerDrop(i)"
          />
        </template>
      </suspense>
    </transition-group>

    <slot :files="files" :dragOver="dragOver" :select="select" />
  </div>
</template>

<script lang="ts">
import '../../../../assets/styles/components/dropzone.css';
import {
  computed, defineComponent, PropType, ref,
} from 'vue';
import { useI18n } from 'vue-i18n';
import type { DropzoneField, DropzoneError } from '../../../../types/form/fields/dropzone';
import DropzoneImage from './dropzone-image.vue';
import { requestWrapper, useChecks } from '../../../../utils';

type ValueType = File | string | (File | string)[] | null;

type DragEvents = 'dragenter' | 'dragleave' | 'dragover' | 'drop';

export default defineComponent({
  name: 'Dropzone',
  components: { DropzoneImage },
  props: {
    /** Value of the dropzone. Use it to model or clear the input */
    modelValue: {
      type: [String, Array, Object] as PropType<ValueType>,
      default: null,
    },

    field: {
      type: Object as PropType<DropzoneField>,
      required: true,
    },
  },
  emits: ['update:modelValue', 'errors', 'textErrors', 'dragenter', 'dragleave', 'dragover', 'drop'],
  setup (props, context) {
    const { t } = useI18n();
    const values = ref<ValueType>(props.modelValue);
    const dragOver = ref<boolean>(false);
    const innerDrag = ref<number>(0);
    const inputEl = ref<HTMLInputElement>();
    const wrapperEl = ref<HTMLDivElement>();
    const draggerEl = ref<HTMLDivElement>();
    const { disabled } = useChecks(props.field);

    /** TODO: This still works incorrectly for valueKey and srcKey if they are different! */
    const uploadToBackend = async (newVal: (File|string)[]) => {
      const uploadedFiles = await Promise.all(newVal.map(async (file) => {
        if (!file) return null;
        if (!props.field.props.saveToBackend) return file;

        const res = await requestWrapper(file, props.field.props.saveToBackend);
        if (res.error) return null;

        // @ts-ignore
        if (res.data && typeof res.data === 'object') return res.data[props.field.props.valueKey || 'value'];
        if (props.field.props.valueKey && res.data) return res.data;
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
        if (props.field.props.multiple) {
          value = Array.isArray(val)
            ? [...(files.value as File[]), ...(await uploadToBackend(val))]
            : await uploadToBackend([val]);
        } else {
          // @ts-ignore
          value = (await uploadToBackend([Array.isArray(val) ? val[0] || null : val]))?.[0] || null;
        }

        values.value = value;
        context.emit('update:modelValue', value);
      },
    });

    const select = () => {
      if (disabled.value) return;
      inputEl.value?.click();
    };

    const toggleDragOver = (val: boolean) => {
      if (props.field.props.noDrop || disabled.value) return;
      dragOver.value = val;
    };

    const changeChildrenPointerEvents = (style: string) => {
      const wrapperChildren = (wrapperEl.value?.childNodes || []) as HTMLElement[];
      wrapperChildren.forEach((node) => {
        node.style.pointerEvents = style;
      });
    };

    const commonHandler = (event: Event) => {
      if (disabled.value) return;

      event.preventDefault();
      context.emit(event.type as DragEvents, event);
    };

    const getErrorTexts = (errors: DropzoneError[]): string => {
      let errStr = '';
      errors.forEach((err) => {
        const fileName = err.name ? `(${err.name})` : '';
        if (err.type === 'FormatsError') {
          errStr += t('core.form.dropzone.wrong_format', { filename: fileName });
        } else if (err.type === 'MaxSizeError') {
          errStr += t('core.form.dropzone.wrong_size', { filename: fileName, size: err.allowed });
        } else if (err.type === 'MaxAmountError') {
          errStr += t('core.form.dropzone.max_files', { max: err.allowed });
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
        if (props.field.props.multiple && props.field.props.maxAmount
          && thisFiles.length + newFiles.length > props.field.props.maxAmount) {
          errors.push({
            type: 'MaxAmountError',
            value: thisFiles.length + newFiles.length,
            allowed: props.field.props.maxAmount,
          });
          context.emit('errors', errors);
          context.emit('textErrors', getErrorTexts(errors));
          return;
        }

        const passedFiles: File[] = [];
        newFiles.forEach((file) => {
          // Handle FormatsError - when single file is not in the list of allowed formats
          const formats = props.field.props.formats || [];
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
          if (props.field.props.maxSize && file.size >= props.field.props.maxSize * 1024 * 1024) {
            errors.push({
              type: 'MaxSizeError',
              value: file.size,
              name: file.name,
              allowed: props.field.props.maxSize,
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
      if (innerDrag.value) return;
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

      if (props.field.props.noDrop || disabled.value) return;
      if (event.dataTransfer) upload(Array.from(event.dataTransfer.files));
      else upload([]);
    };

    const handleInnerDragStart = (index: number) => {
      innerDrag.value = index + 1;
    };

    const handleInnerDragOver = (index: number) => {
      if (index !== innerDrag.value - 1) {
        const vals = values.value as (File | string)[];

        // Swap elements
        const tempEl = vals?.[innerDrag.value - 1];
        vals[innerDrag.value - 1] = vals[index];
        vals[index] = tempEl;
        values.value = [...vals];
        innerDrag.value = index + 1;
      }
    };

    const handleInnerDrop = () => {
      innerDrag.value = 0;
    };

    const inputChange = ({ target }: {target: HTMLInputElement}) => {
      if (target.files && !disabled.value) upload(Array.from(target.files));
    };

    return {
      t,
      values,
      disabled,
      innerDrag,
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
      handleInnerDragStart,
      handleInnerDragOver,
      handleInnerDrop,
      handleDrop,
      inputChange,
      commonHandler,
      changeChildrenPointerEvents,
    };
  },
});
</script>
