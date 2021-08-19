<template>
  <el-form
    ref="formEl"
    :model="form"
    :rules="validation"
    :label-position="'top'"
    :size="reactiveConfig.size"
    :class="['generic-form']"
    @submit.prevent="submit"
  >
    <slot name="before" />

    <FormLayout :layout="reactiveConfig.layout">
      <template #item="field">
        <FormItem
          v-show="!field.hidden"
          v-model="form[field.name]"
          :error="errors[field.name]"
          :field="field"
          :class="field.props.class"
          @error="setFieldError(field.name, $event)"
          @action="customAction(field.name, $event)"
          @update:modelValue="controlOnInput(field.name, $event)"
        />
      </template>
    </FormLayout>

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
        :class="['generic-form_clear', 'width-full']"
        @click="clearForm"
      >
        {{ t('core.form.clear') }}
      </el-button>
      <el-button
        v-if="(config.submitEvent === 'submit' || !config.submitEvent) && config.submit"
        :loading="loading"
        :size="config.size"
        :native-type="config.submit.nativeType || 'submit'"
        :type="config.submit.type || 'primary'"
        :class="['generic-form_submit', 'width-full', config.submit.class || '']"
      >
        {{ customT(config.submit.text) }}
      </el-button>
      <slot name="actions-after" />
    </div>

    <slot name="dialogs" v-bind="formData" />

    <div v-if="reactiveConfig.debug" class="generic-form_debug">
      <pre>{{ JSON.stringify(form, null, 2) }}</pre>
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
  watchEffect, computed,
} from 'vue';
import type { GenericForm } from 'core/types/form';
import type { FormInteractionsData } from 'core/types/form/base';
import { DataTypeInitials, fieldsToModels, layoutToFields } from 'core/utils/form/form';
import { useMobile, useTranslate } from 'core/utils';
import setupValidators from 'core/utils/form/setup-validators';
import FormItem from 'core/views/components/form/form-item.vue';
import FormLayout from 'core/views/components/form/layout.vue';

interface FormValidator extends HTMLFormElement {
  validate: Function,
}

export default defineComponent({
  name: 'GenericForm',
  components: { FormLayout, FormItem },
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

    /** Skip all validations (true) of the form or several validation types (array of validator strings) */
    skipValidation: {
      type: [Boolean, Array] as PropType<boolean | SupportedValidators[]>,
      default: false,
    },
  },
  emits: ['submit'],
  setup (props, context) {
    const { customT, t } = useTranslate();
    const isMobile = useMobile();

    const reactiveConfig = reactive(props.config);
    const allFields = computed(() => layoutToFields(reactiveConfig.layout));
    const form = reactive(fieldsToModels(allFields.value, props.initialData));
    const validation = setupValidators(allFields.value, props.skipValidation, form);

    const globalError = ref<string>(props.error); // Error of the whole form
    const errors = ref<Record<string, string>>(props.fieldErrors); // Field errors record
    const formEl = ref<HTMLFormElement>();

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

    const getField = (name: string) => allFields.value.find((field) => field.name === name);
    const getDialogForm = (name: string) => reactiveConfig.dialogForms?.find((dialogForm) => dialogForm.name === name);
    const formData = reactive<FormInteractionsData>({
      form,
      // @ts-ignore
      getField,
      getDialogForm,
      config: reactiveConfig,
    });

    const controlOnInput = (field: string, newValue: any) => {
      form[field] = newValue;
      if (reactiveConfig.submitEvent === 'input') {
        submit();
      }

      const fieldConfig = getField(field);
      if (fieldConfig?.changeAction) fieldConfig.changeAction(formData);
    };

    const customAction = (field: string, e: { type: string }) => {
      const fieldConfig = getField(field);
      if (fieldConfig?.changeAction) {
        fieldConfig.changeAction({
          ...formData,
          data: e,
        });
      }
    };

    const setFieldError = (field: string, err: string) => {
      errors.value[field] = err;
    };

    const clearForm = () => {
      Object.assign(form, fieldsToModels(allFields.value));
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
      t,
      customT,
      reactiveConfig,
      form,
      validation,
      formEl,
      globalError,
      errors,
      isMobile,
      formData,
      submit,
      setFieldError,
      controlOnInput,
      clearForm,
      customAction,
    };
  },
});
</script>
