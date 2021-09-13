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
import { useTranslate, useChecks } from '../../../../utils';
import type { EditorField } from '../../../../types/form/fields/editor';
import setupEditor from '../../../../utils/form/editor';

export default defineComponent({
  name: 'FormEditor',
  props: {
    field: {
      type: Object as PropType<EditorField>,
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
    const { disabled } = useChecks(props.field);

    const val = ref<string>(props.modelValue);
    watchEffect(() => {
      val.value = props.modelValue;
    });

    const changeVal = (newVal: string) => {
      val.value = newVal;
      context.emit('update:modelValue', newVal);
    };

    onMounted(() => {
      setupEditor({
        holder: props.field.props.id,
        placeholder: customT(props.field.props.placeholder),
        data: {},
        readOnly: disabled.value,
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
