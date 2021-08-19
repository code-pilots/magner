<template>
  <el-input
    ref="input"
    :model-value="val"
    :placeholder="customT(field.props.placeholder)"
    :type="field.props.type"
    :maxlength="field.props.maxLength"
    :minlength="field.props.minLength"
    :show-word-limit="field.props.showLetterLimit"
    :clearable="field.props.clearable"
    :disabled="field.props.disabled"
    :autofocus="field.props.autofocus"
    @input="changeVal"
  >
    <template v-if="field.props.icon" #prefix>
      <div class="generic-form_icon">
        <svg-icon :name="field.props.icon" size="sm" />
      </div>
    </template>
  </el-input>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watchEffect, onMounted,
} from 'vue';
import { useTranslate } from 'core/utils';
import type { InputField } from 'core/types/form/fields/input';
import { create as Maska } from 'maska';
import debounceOnInput from 'core/utils/form/input-debounce';

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

    const val = ref<number|string>(props.modelValue);
    const input = ref<HTMLInputElement>();

    watchEffect(() => {
      val.value = props.modelValue;
    });

    let mask;

    const changeVal = debounceOnInput(props.field.props.inputDelay, val, (newVal: string|number) => {
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
      input,
      changeVal,
    };
  },
});
</script>
