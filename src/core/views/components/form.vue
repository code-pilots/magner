<template>
  <el-form
    ref="formEl"
    :model="form"
    :rules="validation"
    :label-position="'top'"
    class="generic-form"
    @submit.prevent="submit"
  >
    <slot />

    <el-form-item
      v-for="field in config.fields"
      :key="field.name"
      :prop="field.backendName || field.name"
      :required="!!field.required"
      :label="field.label || undefined"
      :label-width="field.label ? (isMobile ? null : '100px') : '0'"
      :error="errors[field.backendName || field.name]"
      :class="['generic-form_item', 'generic-form_item-' + field.type]"
    >
      <FormInput
        v-if="field.type === 'input'"
        v-model="form[field.backendName || field.name]"
        :field="field"
      />

      <el-select
        v-else-if="field.type === 'select'"
        v-model="form[field.backendName || field.name]"
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
        :remote-method="field.component.remoteMethod || null"
        :loading-text="field.component.loadingText || ''"
        :no-match-text="field.component.noMatchText || ''"
        :no-data-text="field.component.noDataText || ''"
      >
        <el-option
          v-for="option in field.options"
          :key="field.component.valueKey ? option[field.component.valueKey] : option.value"
          :value="field.component.valueKey ? option[field.component.valueKey] : option.value"
          :label="field.component.labelKey ? option[field.component.labelKey] : option.label"
          :disabled="option.disabled"
        />
      </el-select>

      <Dropzone
        v-else-if="field.type === 'dropzone'"
        v-model="form[field.backendName || field.name]"
        :max-amount="2"
        :max-size="0.2"
        multiple
        @textErrors="setFieldError(field.backendName || field.name, $event)"
      />
    </el-form-item>

    <slot name="after" />

    <el-alert
      v-if="error"
      :title="globalError"
      :closable="false"
      type="error"
      class="generic-form_error"
    />

    <el-button
      :loading="loading"
      :native-type="config.submit.nativeType || 'submit'"
      :type="config.submit.type || 'primary'"
      :class="['generic-form_submit', 'width-full', config.submit.class || '']"
    >
      {{ config.submit.text }}
    </el-button>
  </el-form>
</template>

<script lang="ts">
import 'styles/components/generic-form.css';
import {
  defineComponent,
  reactive,
  ref,
  PropType, watchEffect,
} from 'vue';
import type { GenericForm } from 'core/types/form';
import { fieldsToModels } from 'core/utils/form';
import FormInput from 'core/views/components/form-input.vue';
import setupValidators from 'core/utils/validators';
import Dropzone from 'core/views/components/dropzone.vue';

interface FormValidator extends HTMLFormElement {
  validate: Function,
}

export default defineComponent({
  name: 'GenericForm',
  components: { Dropzone, FormInput },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object as PropType<GenericForm>,
      required: true,
    },
    error: {
      type: String,
      default: '',
    },
    fieldErrors: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['submit'],
  setup (props, context) {
    const form = reactive(fieldsToModels(props.config.fields));
    const validation = setupValidators(props.config.fields);

    const globalError = ref<string>(props.error); // Error of the whole form
    const errors = ref<Record<string, string>>(props.fieldErrors); // Field errors record

    const formEl = ref<HTMLFormElement>();

    const submit = () => {
      (formEl.value as FormValidator).validate(async (valid: boolean) => {
        if (!valid) return false;

        context.emit('submit', form);
        return true;
      });
    };

    const setFieldError = (field: string, err: string) => {
      errors.value[field] = err;
    };

    watchEffect(() => {
      errors.value = {
        ...errors.value,
        ...props.fieldErrors,
      };
    });

    watchEffect(() => {
      globalError.value = props.error;
    });

    return {
      form,
      validation,
      formEl,
      globalError,
      errors,
      isMobile: window.matchMedia('(max-width: 767px)').matches,
      submit,
      setFieldError,
    };
  },
});
</script>
