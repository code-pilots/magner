<template>
  <el-row
    class="login-page flex-center"
    tag="section"
  >
    <el-col :xs="22" :sm="12" :lg="8">
      <GenericForm
        :fields="config.fields"
        :btn="config.submit"
        :loading="loading"
        :error="error"
        class="login-page_form"
        @submit="login"
      >
        <h1 class="login-page_form_title">
          {{ config.title }}
        </h1>
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
import { useRouter } from 'vue-router';
import type { LoginConfig } from 'core/types/configs';
import useStore from 'core/controllers/store/store';
import GenericForm from '../components/form.vue';

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
    const store = useStore();
    const router = useRouter();

    const loading = ref<boolean>(false);
    const error = ref('');

    const login = async (data: Record<string, any>) => {
      loading.value = true;
      error.value = '';

      const res = await props.config.request({
        store,
        router,
        data,
        globalRoutes: store.state.globalRoutes,
      });

      if (res.error) {
        console.error(res.error);
        error.value = res.error;
      }

      loading.value = false;
    };

    return {
      loading,
      error,
      login,
    };
  },
});
</script>
