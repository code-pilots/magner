<template>
  <el-radio-group
    :model-value="val"
    :text-color="field.props.activeTextColor"
    :fill="field.props.fill"
    @change="changeVal"
  >
    <template v-if="field.radioButtons">
      <el-radio-button
        v-for="option in field.options"
        :key="option.value"
        :label="option.value"
        :disabled="option.disabled"
      >
        {{ customT(option.label) }}
      </el-radio-button>
    </template>

    <template v-else>
      <el-radio
        v-for="option in field.options"
        :key="option.value"
        :label="option.value"
        :disabled="option.disabled"
      >
        {{ customT(option.label) }}
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watchEffect,
} from 'vue';
import { useTranslate } from 'core/utils/translate';
import type { RadioField } from 'core/types/form/fields/radio';

export default defineComponent({
  name: 'FormRadio',
  props: {
    field: {
      type: Object as PropType<RadioField>,
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

    watchEffect(() => {
      val.value = props.modelValue;
    });

    const changeVal = (newVal: number | string) => {
      val.value = newVal;
      context.emit('update:modelValue', newVal);
    };

    return {
      val,
      customT,
      changeVal,
    };
  },
});
</script>
