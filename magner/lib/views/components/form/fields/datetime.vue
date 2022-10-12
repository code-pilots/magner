<template>
  <ReadonlyWrap :field="field" :value="val" gray-block>
    <el-time-picker
      v-if="field.props.type === 'time' || field.props.type === 'timerange'"
      :model-value="val"
      :is-range="field.props.type === 'timerange'"
      :format="field.props.format"
      :placeholder="customT(field.props.placeholder)"
      :editable="field.props.editable"
      :popper-class="field.props.popperClass"
      :range-separator="field.props.rangeSeparator"
      :default-value="field.props.defaultValue"
      :start-placeholder="customT(field.props.startPlaceholder)"
      :end-placeholder="customT(field.props.endPlaceholder)"
      :disabled="disabled"
      @blur="$emit('blur', $event)"
      @update:model-value="changeVal"
    />
    <el-date-picker
      v-else
      :model-value="val"
      :type="field.props.type"
      :format="field.props.format"
      :value-format="field.props.valueFormat"
      :editable="field.props.editable"
      :popper-class="field.props.popperClass"
      :range-separator="field.props.rangeSeparator"
      :default-value="field.props.defaultValue"
      :default-time="field.props.defaultTime"
      :unlink-panels="field.props.unlinkPanels"
      :placeholder="customT(field.props.placeholder)"
      :start-placeholder="customT(field.props.startPlaceholder)"
      :end-placeholder="customT(field.props.endPlaceholder)"
      :disabled="disabled"
      @blur="$emit('blur', $event)"
      @update:model-value="changeVal"
    />
  </ReadonlyWrap>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  watchEffect,
} from 'vue';
import type { DateTimeField } from 'lib/types';
import { useTranslate, useChecks } from 'lib/utils';
import ReadonlyWrap from '../readonly-wrap.vue';

export default defineComponent({
  name: 'DateTime',
  components: { ReadonlyWrap },
  props: {
    field: {
      type: Object as PropType<DateTimeField<any>>,
      required: true,
    },
    modelValue: {
      type: [Date, Array, String],
      default: '',
    },
  },
  emits: ['update:modelValue', 'blur'],
  setup (props, context) {
    const { customT } = useTranslate();
    const { disabled } = useChecks(props.field);

    const val = ref(props.modelValue);
    watchEffect(() => {
      val.value = props.modelValue;
    });

    const changeVal = (newVal: any) => {
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
