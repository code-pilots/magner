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
        :field-errors="fieldErrors"
        :initial-data="initialData"
        :skip-validation="noBackend"
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
  PropType, reactive, computed,
} from 'vue';
import type { LoginConfig } from 'core/types/configs';
import useStore from 'core/controllers/store/store';
import { useTranslate } from 'core/utils/translate';
import { requestWrapper } from 'core/utils/request';
import { layoutToFields } from 'core/utils/form';
import GenericForm from 'core/views/components/form/form.vue';
import { useRouter } from 'vue-router';

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
    const router = useRouter();
    const store = useStore();

    const loading = ref<boolean>(false);
    const error = ref('');
    const fieldErrors = ref<Record<string, string>>({});

    /** No backend. Create fake data that will be accepted by the form */
    const noBackend = computed(() => store.state.project.noBackendMode);
    const fields = noBackend.value ? layoutToFields(props.config.form.layout) : [];
    const initialData = reactive(fields.reduce((accum, current) => {
      accum[current.name] = 'random';
      return accum;
    }, {} as Record<string, string>));

    const login = async (data: Record<string, any>) => {
      error.value = '';
      fieldErrors.value = {};

      if (noBackend.value) {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          router.push({ name: store.state.globalRoutes.homeHasAuthName });
        }, 500);
        return;
      }

      loading.value = true;
      const res = await requestWrapper(data, props.config.request);
      loading.value = false;

      if (res.error && typeof res.error === 'object') {
        fieldErrors.value = res.error.fields;
        error.value = res.error.message;
      } else if (res.error) {
        error.value = res.error;
      } else {
        await router.push({ name: store.state.globalRoutes.homeHasAuthName });
      }
    };

    return {
      loading,
      error,
      fieldErrors,
      noBackend,
      initialData,
      customT,
      login,
    };
  },
});
</script>
