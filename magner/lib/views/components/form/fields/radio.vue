<template>
  <ReadonlyWrap :field="field" :value="val">
    <el-radio-group
      :model-value="val"
      :text-color="field.props.activeTextColor"
      :fill="field.props.fill"
      :disabled="disabled"
      @change="changeVal"
    >
      <template v-if="field.props.radioButtons">
        <el-radio-button
          v-for="option in field.options"
          :key="option.value"
          :label="option.value"
        >
          {{ customT(option.label) }}
        </el-radio-button>
      </template>

      <template v-else>
        <el-radio
          v-for="option in field.options"
          :key="option.value"
          :label="option.value"
          :border="field.props.border"
        >
          {{ customT(option.label) }}
        </el-radio>
      </template>
    </el-radio-group>
  </ReadonlyWrap>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watchEffect,
} from 'vue';
import { useTranslate } from 'lib/utils/core/translate';
import { useChecks } from 'lib/utils/core/mixed-check';
import type { RadioField } from 'lib/types/form/fields/radio';
import ReadonlyWrap from '../readonly-wrap.vue';

export default defineComponent({
  name: 'FormRadio',
  components: { ReadonlyWrap },
  props: {
    field: {
      type: Object as PropType<RadioField<any>>,
      required: true,
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const { customT } = useTranslate();
    const val = ref<number|string|boolean>(props.modelValue);
    const { disabled } = useChecks(props.field);

    watchEffect(() => {
      val.value = props.modelValue;
    });

    const changeVal = (newVal: number | string) => {
      val.value = newVal;
      context.emit('update:modelValue', newVal);
    };

    return {
      val,
      disabled,
      customT,
      changeVal,
    };
  },
});
</script>
