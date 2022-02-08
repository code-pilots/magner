<template>
  <ReadonlyWrap :field="field" :value="val" gray-block>
    <el-select
      ref="selectEl"
      :model-value="val"
      :loading="loading"
      :placeholder="customT(field.props.placeholder || '')"
      :disabled="disabled || false"
      :clearable="field.props.clearable || false"
      :multiple="field.props.multiple || false"
      :collapse-tags="field.props.collapseTags || false"
      :multiple-limit="field.props.multipleLimit || 0"
      :default-first-option="field.props.defaultFirstOption || false"
      :filterable="field.props.filterable || false"
      :filter-method="field.props.filterMethod || null"
      :allow-create="field.props.allowCreate || false"
      :remote="field.props.remote && field.props.filterable || false"
      :remote-method="field.props.filterable ? remoteMethod : null"
      :loading-text="customT(field.props.loadingText || '')"
      :no-match-text="customT(field.props.noMatchText || '')"
      :no-data-text="customT(field.props.noDataText || '')"
      @blur="$emit('blur', $event)"
      @change="changeVal"
    >
      <el-option
        v-for="option in allOptions"
        :key="field.props.valueKey ? option[field.props.valueKey] : option.value"
        :value="field.props.valueKey ? option[field.props.valueKey] : option.value"
        :label="getOptionLabel(option)"
        :disabled="option.disabled || false"
      />
    </el-select>
  </ReadonlyWrap>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  watchEffect,
  watch,
  onMounted,
} from 'vue';
import type { ElSelect } from 'element-plus';
import type { SelectField } from 'lib/types/form/fields/select';
import { useTranslate } from 'lib/utils/core/translate';
import { useChecks } from 'lib/utils/core/mixed-check';
import ReadonlyWrap from '../readonly-wrap.vue';

type SelectValue = number | string | Record<string, unknown> | (number|string|Record<string, unknown>)[];

export default defineComponent({
  name: 'FormSelect',
  components: { ReadonlyWrap },
  props: {
    field: {
      type: Object as PropType<SelectField<any>>,
      required: true,
    },
    modelValue: {
      type: [String, Number, Array, Object] as PropType<SelectValue>,
      default: '',
    },
  },
  emits: ['update:modelValue', 'blur'],
  setup (props, context) {
    const { customT } = useTranslate();
    const { disabled } = useChecks(props.field);

    const val = ref<SelectValue>(props.modelValue);
    const allOptions = ref<SelectField<any>['options']>(props.field.options);
    const loading = ref<boolean>(false);
    const selectEl = ref<typeof ElSelect>();

    const changeVal = (newVal: string|number) => {
      val.value = newVal;
      context.emit('update:modelValue', newVal);
    };

    const remoteMethod = async (search: string) => {
      if (!props.field.props.remote || !props.field.props.remoteMethod) return;

      loading.value = true;
      const newOptions = await props.field.props.remoteMethod(search);
      allOptions.value = newOptions.data?.rows || newOptions.data || [];
      loading.value = false;
    };

    const getOptionLabel = (option: any) => {
      if (props.field.props.labelFormatter) {
        return props.field.props.labelFormatter?.(option);
      }
      return props.field.props.labelKey ? customT(option[props.field.props.labelKey]) : customT(option?.label);
    };

    onMounted(async () => {
      await remoteMethod('');

      if (typeof props.modelValue === 'object' && selectEl.value) {
        if (Array.isArray(props.modelValue)) {
          selectEl.value.selected = props.modelValue.map((opt) => ({
            value: typeof opt === 'object' ? opt[props.field.props.valueKey || 'value'] || '' : opt || '',
            currentLabel: typeof opt === 'object' ? opt[props.field.props.labelKey || 'label'] || '' : opt || '',
            isDisabled: !!props.field.props.disabled,
          }));
        } else {
          selectEl.value.selectedLabel = props.modelValue?.[props.field.props.labelKey || 'label'] || '';
        }
      }
    });

    watchEffect(() => {
      val.value = props.modelValue;
    });

    watch(() => props.field.options, (newVal) => {
      allOptions.value = newVal;
    });

    return {
      val,
      disabled,
      loading,
      allOptions,
      selectEl,
      getOptionLabel,
      customT,
      changeVal,
      remoteMethod,
    };
  },
});
</script>
