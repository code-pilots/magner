<template>
  <el-input
    ref="input"
    :model-value="val"
    :placeholder="customT(field.props.placeholder)"
    :type="field.props.type || 'text'"
    :maxlength="field.props.maxLength"
    :minlength="field.props.minLength"
    :show-word-limit="field.props.showLetterLimit"
    :clearable="field.props.clearable"
    :disabled="disabled"
    :autofocus="field.props.autofocus"
    @input="changeVal"
  >
    <template v-if="field.props.icon" #prefix>
      <div class="generic-form_icon">
        <svg-icon :icon="field.props.icon" size="sm" />
      </div>
    </template>
  </el-input>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watchEffect, onMounted,
} from 'vue';
import { create as Maska } from 'maska';
import { useTranslate } from 'lib/utils/core/translate';
import { useChecks } from 'lib/utils/core/mixed-check';
import debounceOnInput from 'lib/utils/form/input-debounce';
import type { InputField } from 'lib/types/form/fields/input';

export default defineComponent({
  name: 'FormInput',
  props: {
    field: {
      type: Object as PropType<InputField>,
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
    const { disabled, readOnly } = useChecks(props.field);

    const val = ref<number|string>(props.modelValue);
    const input = ref<HTMLInputElement>();

    watchEffect(() => {
      val.value = props.modelValue;
    });

    let mask;

    const changeVal = debounceOnInput(props.field.props.inputDelay || 0, val, (newVal: string|number) => {
      context.emit('update:modelValue', newVal);
    });

    onMounted(() => {
      const inpEl = (input.value as any).input as HTMLInputElement;
      if (props.field.props.mask && inpEl) {
        mask = Maska(inpEl, props.field.props.mask);
      }
    });

    return {
      customT,
      val,
      disabled,
      readOnly,
      input,
      changeVal,
    };
  },
});
</script>
