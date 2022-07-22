<template>
  <ReadonlyWrap :field="field" :value="val" gray-block>
    <el-input
      ref="input"
      :model-value="val"
      :name="field.name"
      :placeholder="customT(field.props.placeholder)"
      :type="field.props.type || 'text'"
      :maxlength="field.props.maxLength"
      :minlength="field.props.minLength"
      :show-word-limit="field.props.showLetterLimit"
      :clearable="field.props.clearable"
      :autofocus="field.props.autofocus"
      :autocomplete="field.props.autocomplete"
      :disabled="disabled"
      :validate-event="false"
      @blur="$emit('blur', $event)"
      @input="changeVal"
    >
      <template v-if="field.props.prefixIcon" #prefix>
        <div class="generic-form_icon">
          <svg-icon :icon="field.props.prefixIcon" size="sm" />
        </div>
      </template>
      <template v-if="field.props.suffixIcon" #suffix>
        <div class="generic-form_icon">
          <svg-icon :icon="field.props.suffixIcon" size="sm" />
        </div>
      </template>
    </el-input>
  </ReadonlyWrap>
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
import ReadonlyWrap from '../readonly-wrap.vue';

export default defineComponent({
  name: 'FormInput',
  components: { ReadonlyWrap },
  props: {
    field: {
      type: Object as PropType<InputField<any>>,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['update:modelValue', 'blur'],
  setup (props, context) {
    const val = ref<number|string>(props.modelValue);
    const input = ref<HTMLInputElement>();

    const { customT } = useTranslate();
    const { disabled } = useChecks(props.field);

    watchEffect(() => {
      val.value = props.modelValue;
    });

    let mask;

    const changeVal = debounceOnInput(props.field.props.inputDelay || 0, val, (newVal: string|number) => {
      context.emit('update:modelValue', newVal);
    });

    onMounted(() => {
      const inpEl = (input.value as any)?.input as HTMLInputElement;
      if (props.field.props.mask && inpEl) {
        mask = Maska(inpEl, props.field.props.mask);
      }
    });

    return {
      customT,
      val,
      disabled,
      input,
      changeVal,
    };
  },
});
</script>
