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
      :error="fieldErrors[field.backendName || field.name]"
      class="generic-form_item"
    >
      <FormInput
        v-if="field.type === 'input'"
        v-model="form[field.backendName || field.name]"
        :field="field"
      />

      <el-select
        v-if="field.type === 'select'"
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
          :label="option.label"
          :disabled="option.disabled"
        />
      </el-select>
    </el-form-item>

    <slot name="after" />

    <el-alert
      v-if="error"
      :title="error"
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
  PropType,
} from 'vue';
import type { GenericForm } from 'core/types/form';
import { fieldsToModels } from 'core/utils/form';
import FormInput from 'core/views/components/form-input.vue';
import setupValidators from 'core/utils/validators';

interface FormValidator extends HTMLFormElement {
  validate: Function,
}

export default defineComponent({
  name: 'GenericForm',
  components: { FormInput },
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

    const formEl = ref<HTMLFormElement>();

    const submit = () => {
      (formEl.value as FormValidator).validate(async (valid: boolean) => {
        if (!valid) return false;

        context.emit('submit', form);
        return true;
      });
    };

    return {
      form,
      validation,
      formEl,
      isMobile: window.matchMedia('(max-width: 767px)').matches,
      submit,
    };
  },
});
</script>
