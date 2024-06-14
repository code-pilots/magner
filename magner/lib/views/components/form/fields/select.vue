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
      :value-key="field.props.valueKey"
      :remote-show-suffix="true"
      @blur="$emit('blur', $event)"
      @focus="onFocus"
      @change="changeVal"
    >
      <template v-if="field.props.multiple && field.props.selectedAll" #header>
        <el-checkbox
          v-model="checkAll"
          :indeterminate="indeterminate"
          @change="handleCheckAll"
        >
          {{ t('core.form.select.check_all') }}
        </el-checkbox>
      </template>
      <el-option
        v-for="option in allOptions"
        :key="getOptionValue(option)"
        :value="getOptionValue(option)"
        :label="getOptionLabel(option)"
        :disabled="option.disabled || false"
      />
      <template v-if="field.props.multiple && field.props.footerButtons" #footer>
        <div class="el-picker-panel__footer">
          <el-button
            text
            plain
            size="small"
            @click="handleClearAll()"
          >
            {{ t('core.form.select.clear') }}
          </el-button>
          <el-button
            text
            plain
            size="small"
            @click="handleCloseDropdown()"
          >
            {{ t('core.form.select.ok') }}
          </el-button>
        </div>
      </template>
    </el-select>
  </ReadonlyWrap>
</template>

<script lang="ts">
import '../../../../assets/styles/components/select.css';
import {
  defineComponent,
  PropType,
  ref,
  watchEffect,
  watch,
  onMounted,
  onUpdated,
} from 'vue';
import type { ElSelect, CheckboxValueType } from 'element-plus';
import type { SelectField } from 'lib/types/form/fields/select';
import { useTranslate, useChecks } from 'lib/utils';
import { DataTypeInitials } from 'lib/utils/form/form';
import { useI18n } from 'vue-i18n';
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
    form: {
      type: Object as PropType<Record<string, DataTypeInitials>>,
      required: true,
    },
  },
  emits: ['update:modelValue', 'blur'],
  setup (props, context) {
    const { t } = useI18n();
    const { customT } = useTranslate();
    const { disabled } = useChecks(props.field);

    const val = ref<SelectValue>(props.modelValue);
    const allOptions = ref<SelectField<any>['options']>(props.field.options);
    const loading = ref<boolean>(false);
    const selectEl = ref<typeof ElSelect>();
    const checkAll = ref<boolean>(false);
    const indeterminate = ref<boolean>(false);

    const changeVal = (newVal: string|number|(string|number)[]) => {
      val.value = Array.isArray(newVal) && newVal.length === 0 ? '' : newVal;
      context.emit('update:modelValue', val.value);
    };

    const remoteMethod = async (search: string) => {
      if (!props.field.props.remote || !props.field.props.remoteMethod) return;

      loading.value = true;
      const newOptions = await props.field.props.remoteMethod({
        search,
        form: props.form,
        currentItem: props.field.parent,
      });
      allOptions.value = newOptions.data?.rows || newOptions.data || [];
      loading.value = false;
    };

    const getOptionLabel = (option: any) => {
      if (props.field.props.labelFormatter) {
        return props.field.props.labelFormatter?.(option);
      }
      return props.field.props.labelKey
        ? customT(option[props.field.props.labelKey])
        : customT(option?.label || option);
    };
    const getOptionValue = (option: any) => {
      if (typeof option === 'object') {
        return option[props.field.props.valueKey || 'value'] || '';
      }
      return option || '';
    };

    const setSelectedLabel = () => {
      if (props.modelValue && typeof props.modelValue === 'object' && selectEl.value) {
        if (!Array.isArray(props.modelValue)) {
          selectEl.value.selectedLabel = getOptionLabel(props.modelValue);
        }
      }
    };

    const onFocus = async () => {
      if (props.field.props.loadRemoteMethodOnFocus) {
        await remoteMethod('');
      }
    };

    const handleCheckAll = (value: CheckboxValueType) => {
      indeterminate.value = false;
      if (value) {
        val.value = allOptions.value.map((_) => getOptionValue(_));
      } else {
        val.value = [];
      }
    };

    const handleClearAll = () => {
      indeterminate.value = false;
      checkAll.value = false;
      val.value = [];
    };

    const handleCloseDropdown = () => {
      if (selectEl.value) {
        selectEl.value.blur();
      }
    };

    onMounted(async () => {
      await remoteMethod('');
      setSelectedLabel();
    });

    onUpdated(() => {
      setSelectedLabel();
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
      checkAll,
      t,
      onFocus,
      getOptionLabel,
      getOptionValue,
      customT,
      changeVal,
      remoteMethod,
      handleCheckAll,
      handleClearAll,
      handleCloseDropdown,
    };
  },
});
</script>
