<template>
  <el-date-picker
    :model-value="val"
    v-bind="field.props"
    :placeholder="customT(field.props.placeholder)"
    :start-placeholder="customT(field.props.startPlaceholder)"
    :end-placeholder="customT(field.props.endPlaceholder)"
    :disabled="field.props.disabled"
    @update:modelValue="changeVal"
  />
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watchEffect,
} from 'vue';
import { useTranslate } from '../../../../utils';
import { DateTimeField } from '../../../../types/form/fields/datetime';

export default defineComponent({
  name: 'DateTime',
  props: {
    field: {
      type: Object as PropType<DateTimeField>,
      required: true,
    },
    modelValue: {
      type: [Date, Array, String],
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const { customT } = useTranslate();

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
      customT,
      changeVal,
    };
  },
});
</script>
