<template>
  <section class="card-page">
    <GenericForm
      :fields="config.fields"
      :btn="config.submit"
      :loading="loading"
      class="card-page_form"
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
import type { GlobalRouting, LoginConfig } from 'settings/types/configs';
import GenericForm from 'settings/views/components/form.vue';

export default defineComponent({
  name: 'CardPage',
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
  setup () {
    const loading = ref<boolean>(false);

    return {
      loading,
    };
  },
});
</script>
