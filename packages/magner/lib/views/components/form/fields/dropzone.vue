<template>
  <ReadonlyWrap :field="field" :value="modelValue">
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
        class="el-upload-dragger empty"
        :class="{'is-dragover': dragOver}"
        @click="select"
      >
        <svg-icon core="cloud" size="full" />
        <div class="el-upload__text">
          {{ t('core.form.dropzone.drag_here') }} <em>{{ t('core.form.dropzone.click_upload') }}</em>
        </div>
      </div>

      <div
        v-else
        ref="draggerEl"
        class="el-upload-dragger images"
        :class="{'is-dragover': dragOver}"
        @click.self="select"
      >
        <DropzoneImage
          v-for="(file, i) in files"
          :key="file.key ? file.key : i + (file.value || '') + (file.size || '')"
          :model-value="file"
          :draggable="field.props.sortable"
          @dragstart="handleInnerDragStart(i)"
          @dragover="handleInnerDragOver(i)"
          @drop="handleInnerDrop(i)"
          @change="updFile($event, i)"
        />
      </div>

      <!--<transition-group
        v-else
        ref="draggerEl"
        tag="div"
        name="field-group"
        class="el-upload-dragger images"
        :class="{'is-dragover': dragOver}"
        @click.self="select"
      ></transition-group>-->

      <slot :files="files" :dragOver="dragOver" :select="select" />
    </div>

    <template #readonly>
      <div class="readonly-block dropzone">
        <DropzoneImage
          v-for="(file, i) in files"
          :key="file.key ? file.key : i + (file.value || '') + (file.size || '')"
          :model-value="file"
          :draggable="false"
        />
      </div>
    </template>
  </ReadonlyWrap>
</template>

<script lang="ts">
import 'lib/assets/styles/components/dropzone.css';
import {
  defineComponent, PropType, ref, nextTick,
} from 'vue';
import { useI18n } from 'vue-i18n';
import type {
  DropzoneField, DropzoneError, DropzoneValue, DropzoneFile,
} from 'lib/types/form/fields/dropzone';
import { checkFileErrors, prepareValue, uploadValues } from 'lib/utils/form/dropzone';
import { useChecks } from 'lib/utils';
import DropzoneImage from './dropzone-image.vue';
import ReadonlyWrap from '../readonly-wrap.vue';

type DragEvents = 'dragenter' | 'dragleave' | 'dragover' | 'drop';

export default defineComponent({
  name: 'Dropzone',
  components: { ReadonlyWrap, DropzoneImage },
  props: {
    /** Value of the dropzone. Use it to model or clear the input */
    modelValue: {
      type: [String, Array, Object] as PropType<DropzoneValue | null>,
      default: null,
    },

    field: {
      type: Object as PropType<DropzoneField<any>>,
      required: true,
    },
  },
  emits: ['update:modelValue', 'errors', 'textErrors', 'dragenter', 'dragleave', 'dragover', 'drop'],
  setup (props, context) {
    const { t } = useI18n();
    const dragOver = ref<boolean>(false);
    const innerDrag = ref<number>(0);
    const inputEl = ref<HTMLInputElement>();
    const wrapperEl = ref<HTMLDivElement>();
    const draggerEl = ref<HTMLDivElement>();
    const { disabled } = useChecks(props.field);

    const files = ref(prepareValue(props.modelValue, props.field));

    const emitChange = () => {
      nextTick(() => {
        const values = files.value.map((file) => file?.value || file?.file || null).filter((file) => !!file);
        context.emit('update:modelValue', !props.field.props.multiple ? values?.[0] || '' : values);
      });
    };

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

    const upload = async (newFiles: File[] | null) => {
      if (!newFiles) {
        files.value = [];
      } else {
        const thisFiles = files.value || [];
        const checkResults = checkFileErrors(newFiles, props.field, thisFiles.length);

        context.emit('errors', checkResults.errors);
        context.emit('textErrors', getErrorTexts(checkResults.errors));

        const newFilesUploaded = uploadValues(checkResults.passedFiles, props.field);
        files.value = props.field.props.multiple ? [...files.value, ...newFilesUploaded] : newFilesUploaded;
        emitChange();
      }
    };

    const updFile = (updatedFile: DropzoneFile, index: number) => {
      files.value[index] = updatedFile;
      emitChange();
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
        const vals = files.value;

        // Swap elements
        const tempEl = vals?.[innerDrag.value - 1];
        vals[innerDrag.value - 1] = vals[index];
        vals[index] = tempEl;
        files.value = [...vals];
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
      files,
      disabled,
      innerDrag,
      dragOver,
      inputEl,
      wrapperEl,
      draggerEl,
      upload,
      select,
      updFile,
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
