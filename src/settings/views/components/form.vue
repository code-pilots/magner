<template>
  <el-form
    ref="formEl"
    :model="form"
    :rules="validation"
    @submit.prevent="submit"
  >
    <slot />

    <el-form-item
      v-for="(field, i) in fields"
      :key="i"
      :prop="field.name"
      :required="!!field.required"
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
    </el-form-item>

    <el-button
      :loading="loading"
      :native-type="btn.nativeType || 'submit'"
      :type="btn.type || 'primary'"
      :class="['width-full', btn.class || '']"
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
  },
  emits: ['submit'],
  setup (props, context) {
    const form = reactive(fieldsToModels(props.fields));
    const validation = setupValidators(props.fields);

    const formEl = ref<HTMLFormElement>();

    const submit = () => {
      formEl.value.validate(async (valid: boolean) => {
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
