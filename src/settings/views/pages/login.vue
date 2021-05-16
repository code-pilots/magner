<template>
  <el-row
    class="login-page flex-center"
    tag="section"
  >
    <el-col :xs="22" :sm="12" :lg="8">
      <el-form
        ref="formEl"
        :model="form"
        :rules="validation"
        class="login-page_form"
        @submit.prevent="login"
      >
        <h1 class="login-page_form_title">
          {{ config.title }}
        </h1>

        <el-form-item
          v-for="(field, i) in config.fields"
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
          :native-type="config.submit.nativeType || 'submit'"
          :type="config.submit.type || 'primary'"
          :class="['width-full', config.submit.class || '']"
        >
          {{ config.submit.text }}
        </el-button>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import 'styles/pages/login.css';
import {
  defineComponent,
  reactive,
  ref,
  PropType,
} from 'vue';
import type { LoginConfig } from 'settings/types';
import setupValidators from 'settings/utils/validators';
import { fieldsToModels } from 'settings/utils/form';
import api from 'app/utils/api';

export default defineComponent({
  name: 'LoginPage',
  props: {
    config: {
      type: Object as PropType<LoginConfig>,
      required: true,
    },
  },
  setup (props) {
    const form = reactive(fieldsToModels(props.config.fields));
    const loading = ref<boolean>(false);
    const formEl = ref<HTMLFormElement>();
    const emailEl = ref<HTMLInputElement>();

    const validation = setupValidators(props.config.fields);

    const login = () => {
      formEl.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          return true;
        }

        return false;
      });
    };

    return {
      form,
      loading,
      validation,
      formEl,
      emailEl,
      login,
    };
  },
});
</script>
