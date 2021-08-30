<template>
  <el-select
    :model-value="val"
    :loading="loading"
    :value-key="field.props.valueKey || 'value'"
    :placeholder="customT(field.props.placeholder || '')"
    :disabled="field.props.disabled || false"
    :clearable="field.props.clearable || false"
    :multiple="field.props.multiple || false"
    :collapse-tags="field.props.collapseTags || false"
    :multiple-limit="field.props.multipleLimit || 0"
    :default-first-option="field.props.defaultFirstOption || false"
    :filterable="field.props.filterable || false"
    :filter-method="field.props.filterMethod || null"
    :remote="field.props.remote || false"
    :remote-method="remoteMethod"
    :loading-text="customT(field.props.loadingText || '')"
    :no-match-text="customT(field.props.noMatchText || '')"
    :no-data-text="customT(field.props.noDataText || '')"
    @change="changeVal"
  >
    <el-option
      v-for="option in allOptions"
      :key="field.props.valueKey ? option[field.props.valueKey] : option.value"
      :value="field.props.valueKey ? option[field.props.valueKey] : option.value"
      :label="field.props.labelKey ? customT(option[field.props.labelKey]) : customT(option.label)"
      :disabled="option.disabled"
    />
  </el-select>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  watchEffect,
} from 'vue';
import type { SelectField } from '../../../../types/form/fields/select';
import { useTranslate, requestWrapper } from '../../../../utils';

export default defineComponent({
  name: 'FormSelect',
  props: {
    field: {
      type: Object as PropType<SelectField>,
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
    const allOptions = ref<Record<string, any>[]>(props.field.options || []);
    const loading = ref<boolean>(false);

    const changeVal = (newVal: string|number) => {
      val.value = newVal;
      context.emit('update:modelValue', newVal);
    };

    const remoteMethod = async (search: string) => {
      if (!props.field.props.remote || !props.field.props.remoteMethod) return;

      loading.value = true;
      const newOptions = await requestWrapper(search, props.field.props.remoteMethod);
      allOptions.value = newOptions.data || [];
      loading.value = false;
    };

    watchEffect(() => {
      val.value = props.modelValue;
    });
    watchEffect(() => {
      allOptions.value = props.field.options;
    });

    return {
      val,
      loading,
      allOptions,
      customT,
      changeVal,
      remoteMethod,
    };
  },
});
</script>
