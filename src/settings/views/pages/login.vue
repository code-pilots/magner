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
          Login
        </h1>

        <el-form-item prop="email" required>
          <el-input
            ref="emailEl"
            v-model="form.email"
            placeholder="E-mail"
            type="email"
            tabindex="1"
            autocomplete="on"
          >
            <template #prefix>
              <svg-icon name="email" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password" required>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Password"
            tabindex="2"
            autocomplete="on"
          >
            <template #prefix>
              <svg-icon name="password" />
            </template>
          </el-input>
        </el-form-item>

        <el-button
          :loading="loading"
          native-type="submit"
          type="primary"
          class="width-full"
        >
          Log In
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
  onMounted,
} from 'vue';
import api from 'app/utils/api';

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const form = reactive({
      email: '',
      password: '',
    });
    const loading = ref<boolean>(false);
    const formEl = ref<HTMLFormElement>();
    const emailEl = ref<HTMLInputElement>();

    const validatePassword = (rule: any, value: string, callback: Function) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'));
      } else {
        callback();
      }
    };

    const validation = {
      password: [{ validator: validatePassword, trigger: 'blur' }],
    };

    const login = () => {
      formEl.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          return true;
        }

        return false;
      });
    };

    onMounted(() => {
      emailEl.value?.focus();
    });

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
