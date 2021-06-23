<template>
  <Dynamic :request="config.getRequest" :data="cardId" :disabled="isNew">
    <template #default="{response, loading}">
      <section v-loading="loading" class="card-page">
        <GenericForm
          :initial-data="response"
          :config="config.form"
          :loading="createLoading"
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
  </Dynamic>
</template>

<script lang="ts">
import 'styles/pages/card.css';
import {
  computed, defineComponent, PropType, ref,
} from 'vue';
import { useRoute } from 'vue-router';
import type { CardConfig } from 'core/types/configs';
import { requestWrapper } from 'core/utils/request';
import Dynamic from 'core/views/components/dynamic.vue';
import GenericForm from '../components/form/form.vue';

export default defineComponent({
  name: 'CardPage',
  components: { Dynamic, GenericForm },
  props: {
    config: {
      type: Object as PropType<CardConfig>,
      required: true,
    },
  },
  setup (props) {
    const route = useRoute();
    const cardId = computed(() => route.params.id);
    const isNew = computed<boolean>(() => cardId.value === 'new');

    const createLoading = ref<boolean>(false);
    const error = ref('');
    const fieldErrors = ref<Record<string, string>>({});

    const save = async (data: Record<string, any>) => {
      createLoading.value = true;
      error.value = '';

      const res = await requestWrapper(data, props.config.createRequest);

      if (res.error) {
        if (typeof res.error === 'string') {
          error.value = res.error;
        } else {
          error.value = res.error.message;
          fieldErrors.value = res.error.fields;
        }
      }

      createLoading.value = false;
    };

    return {
      cardId,
      isNew,
      createLoading,
      error,
      fieldErrors,
      save,
    };
  },
});
</script>
