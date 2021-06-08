<template>
  <section class="card-page">
    <GenericForm
      :fields="config.fields"
      :btn="config.submit"
      :loading="loading"
      :error="error"
      :field-errors="fieldErrors"
      class="card-page_form"
      @submit="save"
    >
      <h1 class="card-page_form_title">
        {{ config.title }}
      </h1>
    </GenericForm>
  </section>
</template>

<script lang="ts">
import 'styles/pages/card.css';
import { defineComponent, PropType, ref } from 'vue';
import type { CardConfig } from 'core/types/configs';
import useStore from 'core/controllers/store/store';
import { useRouter } from 'vue-router';
import GenericForm from '../components/form.vue';

export default defineComponent({
  name: 'CardPage',
  components: { GenericForm },
  props: {
    config: {
      type: Object as PropType<CardConfig>,
      required: true,
    },
  },
  setup (props) {
    const store = useStore();
    const router = useRouter();

    const loading = ref<boolean>(false);
    const error = ref('');
    const fieldErrors = ref<Record<string, string>>({});

    const save = async (data: Record<string, any>) => {
      loading.value = true;
      error.value = '';

      const res = await props.config.request({
        store,
        router,
        data,
        globalRoutes: store.state.globalRoutes,
      });

      if (res.error) {
        if (typeof res.error === 'string') {
          error.value = res.error;
        } else {
          error.value = res.error.message;
          fieldErrors.value = res.error.fields;
        }
      }

      loading.value = false;
    };

    return {
      loading,
      error,
      fieldErrors,
      save,
    };
  },
});
</script>
