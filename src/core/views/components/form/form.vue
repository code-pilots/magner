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

    <FormLayout
      :fields="reactiveConfig.fields"
      :show-amount="fieldsShowAmount"
    >
      <template #item="field">
        <FormItem
          v-show="!field.hidden"
          :key="field.name"
          :ref="setItemEls"
          v-model="form[field.name]"
          :error="errors[field.name]"
          :field="field"
          @error="setFieldError(field.name, $event)"
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
import { DataTypeInitials, fieldsToLayout, fieldsToModels } from 'core/utils/form';
import setupValidators from 'core/utils/validators';
import useMobile from 'core/utils/is-mobile';
import FormItem from 'core/views/components/form/form-item.vue';
import FormLayout from 'core/views/components/form/layout.vue';
import { useI18n } from 'vue-i18n';
import { useTranslate } from 'core/utils/translate';

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
    const { customT, t } = useTranslate();
    const isMobile = useMobile();

    const reactiveConfig = reactive(props.config);
    const form = reactive(fieldsToModels(reactiveConfig.fields, props.initialData));
    const validation = setupValidators(reactiveConfig.fields, props.allowEmptyFields);

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
      t,
      customT,
      reactiveConfig,
      form,
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
