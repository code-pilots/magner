<template>
  <el-input
    :model-value="val"
    type="textarea"
    :placeholder="customT(field.props.placeholder)"
    :rows="field.props.rows"
    :autosize="field.props.autosize"
    :maxlength="field.props.maxLength"
    :minlength="field.props.minLength"
    :show-word-limit="field.props.showLetterLimit"
    :clearable="field.props.clearable"
    :disabled="disabled"
    :resize="field.props.resize"
    :autofocus="field.props.autofocus"
    @input="changeVal"
  />
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watchEffect,
} from 'vue';
import { useChecks, useTranslate } from '../../../../utils';
import debounceOnInput from '../../../../utils/form/input-debounce';
import { TextareaField } from '../../../../types/form/fields/textarea';

export default defineComponent({
  name: 'FormTextarea',
  props: {
    field: {
      type: Object as PropType<TextareaField>,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const { customT } = useTranslate();
    const { disabled } = useChecks(props.field);

    const val = ref<number|string>(props.modelValue);
    watchEffect(() => {
      val.value = props.modelValue;
    });

    const changeVal = debounceOnInput(props.field.props.inputDelay, val, (newVal: string|number) => {
      context.emit('update:modelValue', newVal);
    });

    return {
      disabled,
      customT,
      val,
      changeVal,
    };
  },
});
</script>
