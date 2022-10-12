<template>
  <ReadonlyWrap :field="field" :value="val">
    <el-checkbox-group
      :model-value="val"
      :min="field.props.min"
      :max="field.props.max"
      :text-color="field.props.activeTextColor"
      :fill="field.props.fill"
      :disabled="disabled"
      @change="changeVal"
    >
      <template v-if="field.checkboxButtons">
        <el-checkbox-button
          v-for="option in field.options"
          :key="option.value"
          :label="option.value"
        >
          {{ customT(option.label) }}
        </el-checkbox-button>
      </template>

      <template v-else>
        <el-checkbox
          v-for="option in field.options"
          :key="option.value"
          :label="option.value"
        >
          {{ customT(option.label) }}
        </el-checkbox>
      </template>
    </el-checkbox-group>
  </ReadonlyWrap>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  watchEffect,
} from 'vue';
import type { CheckboxField } from 'lib/types/form/fields/checkbox';
import { useTranslate, useChecks } from 'lib/utils';
import ReadonlyWrap from '../readonly-wrap.vue';

export default defineComponent({
  name: 'FormCheckbox',
  components: { ReadonlyWrap },
  props: {
    field: {
      type: Object as PropType<CheckboxField<any>>,
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
    const { disabled } = useChecks(props.field);

    watchEffect(() => {
      val.value = props.modelValue;
    });

    const changeVal = (newVal: any[]) => {
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
