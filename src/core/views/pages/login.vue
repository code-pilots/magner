<template>
  <el-row
    class="login-page flex-center"
    tag="section"
  >
    <el-col :xs="22" :sm="12" :lg="8">
      <GenericForm
        :config="config.form"
        :loading="loading"
        :error="error"
        class="login-page_form"
        @submit="login"
      >
        <template #before>
          <h1 class="login-page_form_title">
            {{ customT(config.title) }}
          </h1>
        </template>
      </GenericForm>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import 'styles/pages/login.css';
import {
  defineComponent,
  ref,
  PropType,
} from 'vue';
import type { LoginConfig } from 'core/types/configs';
import { useTranslate } from 'core/utils/translate';
import { requestWrapper } from 'core/utils/request';
import GenericForm from '../components/form/form.vue';

export default defineComponent({
  name: 'LoginPage',
  components: { GenericForm },
  props: {
    config: {
      type: Object as PropType<LoginConfig>,
      required: true,
    },
  },
  setup (props) {
    const { customT } = useTranslate();
    const loading = ref<boolean>(false);
    const error = ref('');

    const login = async (data: Record<string, any>) => {
      loading.value = true;
      error.value = '';

      const res = await requestWrapper(data, props.config.request);

      if (res.error) {
        console.error(res.error);
        error.value = res.error;
      }

      loading.value = false;
    };

    return {
      loading,
      error,
      customT,
      login,
    };
  },
});
</script>
