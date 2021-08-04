<template>
  <el-form
    ref="formEl"
    :model="form"
    :rules="validation"
    :label-position="'top'"
    :size="reactiveConfig.size"
    :class="['generic-form', { 'generic-form-no-columns': groupedFields.length <= 1 }]"
    @submit.prevent="submit"
  >
    <slot name="before" />

    <template v-if="groupedFields.length > 1">
      <div :class="['generic-form_columns', `generic-form-${groupedFields.length}-columns`]">
        <transition-group
          v-for="(column, i) in groupedFields"
          :key="i"
          :class="['generic-form_columns_column', 'generic-form_column-' + (i + 1)]"
          name="field-group"
          tag="div"
        >
          <FormItem
            v-for="field in column"
            :key="field.name"
            :ref="setItemEls"
            v-model="form[field.name]"
            :error="errors[field.name]"
            :field="field"
            @error="setFieldError(field.name, $event)"
            @update:modelValue="controlOnInput(field.name, $event)"
          />
        </transition-group>
      </div>
    </template>

    <transition-group v-else name="field-group" tag="div">
      <template v-for="field in (groupedFields[0] || [])" :key="field.name">
        <FormItem
          v-show="!field.hidden"
          :ref="setItemEls"
          v-model="form[field.name]"
          :error="errors[field.name]"
          :field="field"
          @error="setFieldError(field.name, $event)"
          @update:modelValue="controlOnInput(field.name, $event)"
        />
      </template>
    </transition-group>

    <slot name="after" />

    <el-alert
      v-if="error"
      :title="globalError"
      :closable="false"
      type="error"
      class="generic-form_error"
    />

    <div class="generic-form_actions">
      <slot name="actions-before" />
      <el-button
        v-if="config.clearable"
        :size="config.size"
        native-type="button"
        type="secondary"
        :class="['generic-form_clear', 'width-full']"
        @click="clearForm"
      >
        Очистить
      </el-button>
      <el-button
        v-if="(config.submitEvent === 'submit' || !config.submitEvent) && config.submit"
        :loading="loading"
        :size="config.size"
        :native-type="config.submit.nativeType || 'submit'"
        :type="config.submit.type || 'primary'"
        :class="['generic-form_submit', 'width-full', config.submit.class || '']"
      >
        {{ config.submit.text }}
      </el-button>
      <slot name="actions-after" />
    </div>

    <slot name="end" />
  </el-form>
</template>

<script lang="ts">
import 'styles/components/generic-form.css';
import {
  defineComponent,
  reactive,
  ref,
  PropType,
  watchEffect,
  computed,
} from 'vue';
import type { GenericForm } from 'core/types/form';
import { DataTypeInitials, fieldsToColumns, fieldsToModels } from 'core/utils/form';
import setupValidators from 'core/utils/validators';
import useMobile from 'core/utils/is-mobile';
import FormItem from 'core/views/components/form/form-item.vue';

interface FormValidator extends HTMLFormElement {
  validate: Function,
}

export default defineComponent({
  name: 'GenericForm',
  components: { FormItem },
  props: {
    config: {
      type: Object as PropType<GenericForm>,
      required: true,
    },

    /** Object with keys as field names and values as whatever you pass to a form field */
    initialData: {
      type: Object,
      default: () => ({}),
    },

    /** When submitting, emit the object with modified fields only */
    returnInitialDifference: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
    fieldErrors: {
      type: Object,
      default: () => ({}),
    },

    /** Property trims all fields that are out of this amount */
    fieldsShowAmount: {
      type: Number,
      default: null,
    },

    /** If the field has validation of type 'empty', skip this validation (Used in filters) */
    allowEmptyFields: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['submit'],
  setup (props, context) {
    const isMobile = useMobile();

    const reactiveConfig = reactive(props.config);
    const form = reactive(fieldsToModels(reactiveConfig.fields, props.initialData));
    const validation = setupValidators(reactiveConfig.fields, props.allowEmptyFields);
    const groupedFields = computed(() => fieldsToColumns(reactiveConfig.fields, props.fieldsShowAmount));

    const globalError = ref<string>(props.error); // Error of the whole form
    const errors = ref<Record<string, string>>(props.fieldErrors); // Field errors record

    const formEl = ref<HTMLFormElement>();
    const itemEls = ref<(typeof FormItem)[]>([]);

    const setItemEls = (el: typeof FormItem) => {
      if (el && el.field?.name && !itemEls.value.some((item) => item?.field?.name === el.field.name)) {
        itemEls.value.push(el);
      }
    };

    const submit = () => {
      (formEl.value as FormValidator).validate(async (valid: boolean) => {
        if (!valid) return false;

        /** For PATCH methods, return the difference with existing data */
        if (props.returnInitialDifference) {
          const diff = Object.entries(form).reduce((accum, entry) => {
            if (props.initialData?.[entry[0]] && props.initialData[entry[0]] !== entry[1]) {
              accum[entry[0]] = entry[1];
            }
            return accum;
          }, {} as Record<string, DataTypeInitials>);
          context.emit('submit', diff);
          return true;
        }

        context.emit('submit', form);
        return true;
      });
    };

    const controlOnInput = (field: string, newValue: any) => {
      form[field] = newValue;
      if (reactiveConfig.submitEvent === 'input') {
        submit();
      }

      const fieldConfig = reactiveConfig.fields.find((option) => option.name === field);
      fieldConfig.changeAction?.(form, reactiveConfig);
    };

    const setFieldError = (field: string, err: string) => {
      errors.value[field] = err;
    };

    const clearForm = () => {
      Object.assign(form, fieldsToModels(reactiveConfig.fields));
      submit();
    };

    watchEffect(() => {
      Object.assign(form, props.initialData);
    });

    watchEffect(() => {
      if (!Object.keys(props.fieldErrors).length) {
        errors.value = {};
      } else {
        errors.value = {
          ...errors.value,
          ...props.fieldErrors,
        };
      }
    });

    watchEffect(() => {
      globalError.value = props.error;
    });

    return {
      reactiveConfig,
      form,
      groupedFields,
      validation,
      formEl,
      globalError,
      errors,
      isMobile,
      setItemEls,
      submit,
      setFieldError,
      controlOnInput,
      clearForm,
    };
  },
});
</script>
