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

    <FormItem
      v-for="field in (filtersShowAmount ? config.fields.slice(0, filtersShowAmount) : config.fields)"
      :key="field.name"
      v-model="form[field.name]"
      :error="errors[field.name]"
      :field="field"
      @error="setFieldError(field.name, $event)"
      @update:value="controlOnInput(field.name, $event)"
    />

    <slot name="after" />

    <el-alert
      v-if="error"
      :title="globalError"
      :closable="false"
      type="error"
      class="generic-form_error"
    />

    <el-button
      v-if="config.submitEvent === 'submit' && config.submit"
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
import FormInput from 'core/views/components/form/form-input.vue';
import setupValidators from 'core/utils/validators';
import Dropzone from 'core/views/components/form/dropzone.vue';
import FormSelect from 'core/views/components/form/select.vue';
import useMobile from 'core/utils/is-mobile';
import FormItem from 'core/views/components/form/form-item.vue';

interface FormValidator extends HTMLFormElement {
  validate: Function,
}

export default defineComponent({
  name: 'GenericForm',
  components: { FormItem },
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
    filtersShowAmount: {
      type: Number,
      default: null,
    },
  },
  emits: ['submit'],
  setup (props, context) {
    const isMobile = useMobile();

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

    const controlOnInput = (field: string, newValue: any) => {
      form[field] = newValue;
      if (props.config.submitEvent === 'input') {
        submit();
      }
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
      isMobile,
      submit,
      setFieldError,
      controlOnInput,
    };
  },
});
</script>
