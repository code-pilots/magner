<template>
  <el-row
    class="login-page flex-center"
    tag="section"
  >
    <el-col :xs="22" :sm="12" :lg="8">
      <GenericForm
        :config="config.form"
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
import 'lib/assets/styles/pages/login.css';
import {
  defineComponent,
  ref,
  PropType, reactive, computed,
} from 'vue';
import { useRouter } from 'vue-router';
import type { LoginConfig, ProfileRequestResponse } from 'lib/types/configs';
import useStore from 'lib/controllers/store/store';
import { useTranslate } from 'lib/utils/core/translate';
import { requestWrapper } from 'lib/utils/core/request';
import { layoutToFields } from 'lib/utils/form/form';
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
    const router = useRouter();
    const store = useStore();

    const error = ref('');
    const fieldErrors = ref<Record<string, string>>({});

    /** No backend. Create fake data that will be accepted by the form */
    const noBackend = computed(() => store.state.project.development.noBackendMode);
    const fields = noBackend.value ? layoutToFields(props.config.form.layout) : [];
    const initialData = reactive(fields.reduce((accum, current) => {
      accum[current.name] = 'random';
      return accum;
    }, {} as Record<string, string>));

    const login = async (data: Record<string, any>) => {
      const submitButton = (props.config.form.actions || []).find((action) => action.action === 'submit');

      error.value = '';
      fieldErrors.value = {};

      if (noBackend.value) {
        if (submitButton) submitButton.loading = true;
        setTimeout(() => {
          if (submitButton) submitButton.loading = false;
          router.push({ name: store.state.project.routes.global.homeHasAuthName });
        }, 500);
        return;
      }

      if (submitButton) submitButton.loading = true;
      const res = await requestWrapper<ProfileRequestResponse>(data, props.config.request);
      if (submitButton) submitButton.loading = false;

      if (res.error && typeof res.error === 'object') {
        fieldErrors.value = res.error.fields;
        error.value = res.error.message;
      } else if (res.error) {
        error.value = res.error;
      } else if (res.data) {
        await store.dispatch('changeToken', res.data.token);
        await store.dispatch('changeUser', res.data.user);
        await store.dispatch('changeRole', res.data.role);
        await router.push({ name: store.state.project.routes.global.homeHasAuthName });
      }
    };

    return {
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
