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
      :multiple="multiple"
      :disabled="disabled"
      v-bind="inputAttrs"
      @change="inputChange"
    >

    <div
      v-if="!displayFiles.length"
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
      <div
        v-for="(image, i) in displayFiles"
        :key="i"
        class="el-upload-dragger_image"
      >
        <el-image :src="image" />
      </div>
    </div>

    <slot :files="files" :dragOver="dragOver" :select="select" />
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType, ref,
} from 'vue';

type ValueType = File | string | (File | string)[] | null;

interface FileInputAttrs {
  id: string,
  name: string,
  accept: string,
  capture: string,
  autofocus: string,
}

export interface DropzoneError {
  type: 'FormatsError'|'MaxAmountError'|'MaxSizeError',
  value: number | string, // value of the exceeded property like file size, or extension, or ratio.
  allowed: number | string | string[] | Record<string, unknown>, // value of the passed property that checks the error
  name?: string, // name of the file
}

type DragEvents = 'dragenter' | 'dragleave' | 'dragover' | 'drop';

export default defineComponent({
  name: 'Dropzone',
  props: {
    /** Value of the dropzone. Use it to model or clear the input */
    value: {
      type: [Array, Object] as PropType<ValueType>,
      default: null,
    },

    /**
     * Accept one or multiple files. Depending on this prop, the 'update:value' event
     * sends an Object of a file or an Array of files
     */
    multiple: {
      type: Boolean,
      default: false,
    },

    /** If true, no drag&drop events will work. Can select only with click then */
    noDrop: {
      type: Boolean,
      default: false,
    },

    /** Disable the dropzone and give it a special class */
    disabled: {
      type: Boolean,
      default: false,
    },

    /** Check the amount of files selected in multiple mode. Return MaxAmountError if wrong */
    maxAmount: {
      type: Number,
      default: null,
      validator: (val: number) => !Number.isNaN(val) && val > 0,
    },

    /** Check the sizes (in Megabytes) of each selected file, reject wrong ones with MaxSizeError */
    maxSize: {
      type: Number,
      default: null,
      validator: (val: number) => !Number.isNaN(val) && val > 0,
    },

    /** Check the extensions of each selected file, reject wrong with FormatsError */
    formats: {
      type: Array as PropType<string[] | null>,
      default: null,
    },

    /** Input HTML-attributes. Pass in the object */
    inputAttrs: {
      type: Object as PropType<FileInputAttrs | null>,
      default: () => ({
        id: null,
        name: null,
        accept: null,
        capture: null,
        autofocus: null,
      }),
    },
  },
  emits: ['update:value', 'errors', 'textErrors', 'dragenter', 'dragleave', 'dragover', 'drop'],
  setup (props, context) {
    const values = ref<ValueType>(props.value);
    const dragOver = ref<boolean>(false);
    const inputEl = ref<HTMLInputElement>();
    const wrapperEl = ref<HTMLDivElement>();
    const draggerEl = ref<HTMLDivElement>();
    const displayFiles = ref<string[]>([]);

    const readAsDataURL = (file: File | string): Promise<string|null> => new Promise((resolve) => {
      if (typeof file === 'string') {
        resolve(file);
      } else {
        if (file['type'].split('/')[0] !== 'image') resolve(null); // eslint-disable-line

        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(file);
      }
    });

    const files = computed({
      get (): (File | string)[] {
        if (Array.isArray(values.value)) return values.value;
        if (values.value && typeof values.value === 'object') return [values.value];
        return [];
      },
      async set (val: File | string | (File | string)[]) {
        let value;
        if (props.multiple) {
          value = Array.isArray(val) ? [...(files.value as File[]), ...val] : [val];
          displayFiles.value = (await Promise.all(value.map((file) => readAsDataURL(file))))
            .filter((img) => !!img) as string[];
        } else {
          value = Array.isArray(val) ? val[0] || null : val;
          if (value) {
            const url = await readAsDataURL(value);
            if (url) displayFiles.value = [url];
          }
        }

        values.value = value;
        context.emit('update:value', value);
      },
    });

    const select = () => {
      inputEl.value?.click();
    };

    const toggleDragOver = (val: boolean) => {
      if (props.noDrop || props.disabled) return;
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

    const upload = (newFiles: File[]|null) => {
      if (!newFiles) {
        files.value = [];
      } else {
        const thisFiles = (files.value || []) as File[];
        const errors: DropzoneError[] = [];

        // Handle MaxAmountError and prevent all files from being uploaded if the
        // given amount of files is more than allowed
        if (props.multiple && props.maxAmount && thisFiles.length + newFiles.length > props.maxAmount) {
          errors.push({
            type: 'MaxAmountError',
            value: thisFiles.length + newFiles.length,
            allowed: props.maxAmount,
          });
          context.emit('errors', errors);
          context.emit('textErrors', getErrorTexts(errors));
          return;
        }

        const passedFiles: File[] = [];
        newFiles.forEach((file) => {
          // Handle FormatsError - when single file is not in the list of allowed formats
          if (props.formats !== null) {
            const format = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
            if (props.formats.indexOf(format) === -1) {
              errors.push({
                type: 'FormatsError',
                value: format,
                name: file.name,
                allowed: props.formats,
              });
              return;
            }
          }

          // Handle MaxSizeError - when single file is too heavy
          if (props.maxSize && file.size >= props.maxSize * 1024 * 1024) {
            errors.push({
              type: 'MaxSizeError',
              value: file.size,
              name: file.name,
              allowed: props.maxSize,
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

      if (props.noDrop || props.disabled) return;
      if (event.dataTransfer) upload(Array.from(event.dataTransfer.files));
      else upload([]);
    };

    const inputChange = ({ target }: {target: HTMLInputElement}) => {
      if (target.files && !props.disabled) upload(Array.from(target.files));
    };

    return {
      values,
      dragOver,
      files,
      inputEl,
      wrapperEl,
      draggerEl,
      displayFiles,
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
