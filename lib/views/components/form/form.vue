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

    <FormActions
      :actions="reactiveConfig.actions"
      :size="reactiveConfig.size"
      :skip-actions="(config.submitEvent && config.submitEvent === 'input') ? ['submit'] : []"
      @action="doActions"
    >
      <template #actions-before><slot name="actions-before" /></template>
      <template #actions-after><slot name="actions-after" /></template>
    </FormActions>

    <slot name="dialogs" v-bind="formData" />

    <div v-if="reactiveConfig.debug" class="generic-form_debug">
      <pre>{{ JSON.stringify(form, null, 2) }}</pre>
    </div>

    <slot name="end" />
  </el-form>
</template>

<script lang="ts">
import 'lib/assets/styles/components/generic-form.css';
import {
  defineComponent, reactive, ref, PropType,
  watchEffect, computed,
} from 'vue';
import { useRouter } from 'vue-router';
import type { GenericForm } from 'lib/types/form';
import type { FormInteractionsData } from 'lib/types/form/base';
import type { SupportedValidators } from 'lib/types/configs';
import type { ActionAction } from 'lib/types/utils/actions';
import { DataTypeInitials, fieldsToModels, layoutToFields } from 'lib/utils/form/form';
import { useTranslate } from 'lib/utils/core/translate';
import { useMobile } from 'lib/utils/core/is-mobile';
import { updateFieldValues } from 'lib/utils/core/mixed-check';
import setupValidators from 'lib/utils/form/setup-validators';
import FormItem from './form-item.vue';
import FormLayout from './layout.vue';
import FormActions from './form-actions.vue';

interface FormValidator extends HTMLFormElement {
  validate: Function,
}

export default defineComponent({
  name: 'GenericForm',
  components: { FormActions, FormLayout, FormItem },
  props: {
    config: {
      type: Object as PropType<GenericForm<any>>,
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

    /** Skip action buttons to be displayed. 'true' skips all, array of strings skips specific ones */
    skipActions: {
      type: [Array, Boolean] as PropType<string[] | boolean>,
      default: () => ([]),
    },
  },
  emits: ['submit', 'remove', 'action'],
  setup (props, context) {
    const { customT, t } = useTranslate();
    const isMobile = useMobile();
    const router = useRouter();

    const reactiveConfig = reactive(props.config);
    const allFields = computed(() => layoutToFields(reactiveConfig.layout));
    const form = reactive(fieldsToModels(allFields.value, props.initialData));
    const validation = setupValidators(allFields.value, props.skipValidation, form);

    const globalError = ref<string>(props.error); // Error of the whole form
    const errors = ref<Record<string, string>>(props.fieldErrors); // Field errors record
    const formEl = ref<HTMLFormElement>();

    allFields.value.forEach((field) => {
      updateFieldValues(field, form);
    });

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
    const formData = reactive<FormInteractionsData<any>>({
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

    const doActions = async (action: ActionAction) => {
      if (action.emits === 'clear') {
        Object.assign(form, fieldsToModels(allFields.value));
        errors.value = {};
        return;
      }

      if (action.emits === 'submit') {
        submit();
        return;
      }

      if (action.emits === 'cancel') {
        await router.go(-1);
        await router.push('/');
        return;
      }

      if (action.emits === 'remove') {
        context.emit('remove', action);
      }
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
      customAction,
      doActions,
    };
  },
});
</script>
