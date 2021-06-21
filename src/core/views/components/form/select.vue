<template>
  <el-select
    :model-value="val"
    :loading="loading"
    :value-key="field.component.valueKey || 'value'"
    :placeholder="field.component.placeholder || ''"
    :disabled="field.component.disabled || false"
    :clearable="field.component.clearable || false"
    :multiple="field.component.multiple || false"
    :collapse-tags="field.component.collapseTags || false"
    :multiple-limit="field.component.multipleLimit || 0"
    :default-first-option="field.component.defaultFirstOption || false"
    :filterable="field.component.filterable || false"
    :filter-method="field.component.filterMethod || null"
    :remote="field.component.remote || false"
    :remote-method="remoteMethod"
    :loading-text="field.component.loadingText || ''"
    :no-match-text="field.component.noMatchText || ''"
    :no-data-text="field.component.noDataText || ''"
    @change="changeVal"
  >
    <el-option
      v-for="option in allOptions"
      :key="field.component.valueKey ? option[field.component.valueKey] : option.value"
      :value="field.component.valueKey ? option[field.component.valueKey] : option.value"
      :label="field.component.labelKey ? option[field.component.labelKey] : option.label"
      :disabled="option.disabled"
    />
  </el-select>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect, } from 'vue';
import type { SelectField } from 'core/types/form/select';
import { requestWrapper } from 'core/utils/request';

export default defineComponent({
  name: 'FormSelect',
  props: {
    field: {
      type: Object as PropType<SelectField>,
      required: true,
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['update:value'],
  setup (props, context) {
    const val = ref<number|string>(props.value);
    const allOptions = ref<Record<string, any>[]>(props.field.options || []);
    const loading = ref<boolean>(false);

    const changeVal = (newVal: string|number) => {
      val.value = newVal;
      context.emit('update:value', newVal);
    };

    const remoteMethod = async (search: string) => {
      if (!props.field.component.remote || !props.field.component.remoteMethod) return;

      loading.value = true;
      const newOptions = await requestWrapper(search, props.field.component.remoteMethod);
      allOptions.value = newOptions.data || [];
      loading.value = false;
    };

    watchEffect(() => {
      val.value = props.value;
    });
    watchEffect(() => {
      allOptions.value = props.field.options;
    });

    return {
      val,
      loading,
      allOptions,
      changeVal,
      remoteMethod,
    };
  },
});
</script>
