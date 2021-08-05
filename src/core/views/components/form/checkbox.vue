<template>
  <el-checkbox-group
    :model-value="val"
    :min="field.component.min"
    :max="field.component.max"
    :text-color="field.component.activeTextColor"
    :fill="field.component.fill"
    @change="changeVal"
  >
    <template v-if="field.radioButtons">
      <el-checkbox-button
        v-for="option in field.options"
        :key="option.value"
        :label="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </el-checkbox-button>
    </template>

    <template v-else>
      <el-checkbox
        v-for="option in field.options"
        :key="option.value"
        :label="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watchEffect,
} from 'vue';
import type { CheckboxField } from 'core/types/form/checkbox';

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
    const val = ref<any[]>(props.modelValue);

    watchEffect(() => {
      val.value = props.modelValue;
    });

    const changeVal = (newVal) => {
      val.value = newVal;
      context.emit('update:modelValue', newVal);
    };

    return {
      val,
      changeVal,
    };
  },
});
</script>
