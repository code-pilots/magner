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
import type { GlobalRouting, LoginConfig } from 'settings/types/configs';
import GenericForm from 'settings/views/components/form.vue';
import useStore from 'settings/controllers/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginPage',
  components: { GenericForm },
  props: {
    config: {
      type: Object as PropType<LoginConfig>,
      required: true,
    },
    globalRoutes: {
      type: Object as PropType<GlobalRouting>,
      required: true,
    },
  },
  setup (props) {
    const store = useStore();
    const router = useRouter();

    const loading = ref<boolean>(false);

    const login = async (data: Record<string, any>) => {
      loading.value = true;

      const res = await props.config.request({
        store,
        router,
        data,
        globalRoutes: props.globalRoutes,
      });

      if (res.error) {
        console.error(res.error);
      }

      loading.value = false;
    };

    return {
      loading,
      login,
    };
  },
});
</script>
