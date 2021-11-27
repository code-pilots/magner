<template>
  <ReadonlyWrap :field="field" :value="val" gray-block>
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
  </ReadonlyWrap>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watchEffect,
} from 'vue';
import { useTranslate } from 'lib/utils/core/translate';
import { useChecks } from 'lib/utils/core/mixed-check';
import debounceOnInput from 'lib/utils/form/input-debounce';
import type { TextareaField } from 'lib/types/form/fields/textarea';
import ReadonlyWrap from '../readonly-wrap.vue';

export default defineComponent({
  name: 'FormTextarea',
  components: { ReadonlyWrap },
  props: {
    field: {
      type: Object as PropType<TextareaField<any>>,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const val = ref<number|string>(props.modelValue);

    const { customT } = useTranslate();
    const { disabled } = useChecks(props.field);

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
