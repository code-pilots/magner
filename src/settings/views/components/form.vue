<template>
  <el-form
    ref="formEl"
    :model="form"
    :rules="validation"
    class="generic-form"
    @submit.prevent="submit"
  >
    <slot />

    <el-form-item
      v-for="(field, i) in fields"
      :key="field.name"
      :prop="field.backendName || field.name"
      :required="!!field.required"
      class="generic-form_item"
    >
      <el-input
        v-if="field.type === 'input'"
        v-model="form[field.backendName || field.name]"
        :placeholder="field.component.placeholder"
        :type="field.component.type"
        :tabindex="i.toString()"
      >
        <template v-if="field.component.icon" #prefix>
          <div class="login-page_form_icon">
            <svg-icon :name="field.component.icon" size="sm" />
          </div>
        </template>
      </el-input>

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
      :native-type="btn.nativeType || 'submit'"
      :type="btn.type || 'primary'"
      :class="['generic-form_submit', 'width-full', btn.class || '']"
    >
      {{ btn.text }}
    </el-button>
  </el-form>
</template>

<script lang="ts">
import 'styles/pages/login.css';
import {
  defineComponent,
  reactive,
  ref,
  PropType,
} from 'vue';
import type { GenericComponent } from 'settings/types/components';
import type { ButtonComponent } from 'settings/types/components/button';
import setupValidators from 'settings/utils/validators';
import { fieldsToModels } from 'settings/utils/form';

interface FormValidator extends HTMLFormElement {
  validate: Function,
}

export default defineComponent({
  name: 'GenericForm',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    fields: {
      type: Array as PropType<GenericComponent[]>,
      default: () => ([]),
    },
    btn: {
      type: Object as PropType<ButtonComponent>,
      required: true,
    },
    error: {
      type: String,
      default: '',
    },
  },
  emits: ['submit'],
  setup (props, context) {
    const form = reactive(fieldsToModels(props.fields));
    const validation = setupValidators(props.fields);

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
      submit,
    };
  },
});
</script>
