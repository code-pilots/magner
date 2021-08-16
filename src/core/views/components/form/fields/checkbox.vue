<template>
  <el-checkbox-group
    :model-value="val"
    :min="field.props.min"
    :max="field.props.max"
    :text-color="field.props.activeTextColor"
    :fill="field.props.fill"
    @change="changeVal"
  >
    <template v-if="field.checkboxButtons">
      <el-checkbox-button
        v-for="option in field.options"
        :key="option.value"
        :label="option.value"
        :disabled="option.disabled"
      >
        {{ customT(option.label) }}
      </el-checkbox-button>
    </template>

    <template v-else>
      <el-checkbox
        v-for="option in field.options"
        :key="option.value"
        :label="option.value"
        :disabled="option.disabled"
      >
        {{ customT(option.label) }}
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watchEffect,
} from 'vue';
import type { CheckboxField } from 'core/types/form/fields/checkbox';
import { useTranslate } from 'core/utils/translate';

export default defineComponent({
  name: 'FormCheckbox',
  props: {
    field: {
      type: Object as PropType<CheckboxField>,
      required: true,
    },
    modelValue: {
      type: Array,
      default: () => ([]),
    },
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const { customT } = useTranslate();
    const val = ref<any[]>(props.modelValue);

    watchEffect(() => {
      val.value = props.modelValue;
    });

    const changeVal = (newVal: any[]) => {
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
