<template>
  <div
    :id="field.props.id"
    class="form-editor"
    :class="{disabled}"
  />
</template>

<script lang="ts">
import '../../../../assets/styles/components/editor.css';
import {
  defineComponent, onMounted, PropType, ref, watchEffect,
} from 'vue';
import { useTranslate, useChecks } from 'lib/utils';
import type { EditorField } from 'lib/types/form/fields/editor';
import setupEditor from 'lib/utils/form/editor';
import { OutputData } from '@editorjs/editorjs';

export default defineComponent({
  name: 'FormEditor',
  props: {
    field: {
      type: Object as PropType<EditorField<any>>,
      required: true,
    },
    modelValue: {
      type: [String],
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const { customT } = useTranslate();
    const { disabled, readOnly } = useChecks(props.field);

    const val = ref<string>(props.modelValue);
    watchEffect(() => {
      val.value = props.modelValue;
    });

    const changeVal = (newVal: string) => {
      val.value = newVal;
      context.emit('update:modelValue', newVal);
    };

    onMounted(() => {
      let parsedData: OutputData;
      try {
        parsedData = JSON.parse(val.value);
      } catch (_) {
        parsedData = { blocks: [] };
      }

      setupEditor({
        holder: props.field.props.id,
        placeholder: customT(props.field.props.placeholder || ''),
        data: parsedData,
        readOnly: readOnly.value || disabled.value,
        onChange: (editor) => {
          editor.saver?.save?.().then((outputData) => {
            changeVal(JSON.stringify(outputData));
          });
        },
      });
    });

    return {
      val,
      disabled,
      customT,
      changeVal,
    };
  },
});
</script>
