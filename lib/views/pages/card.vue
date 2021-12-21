<template>
  <Dynamic :request="config.getRequest" :data="cardId" :disabled="isNew">
    <template #default="{response, loading}">
      <section v-loading="loading" class="card-page" :class="pageName">
        <PageHeader :header="config.header" />

        <CardForm
          :config="config"
          :is-new="isNew"
          :entity-id="cardId"
          :initial-data="response"
        />
      </section>
    </template>
  </Dynamic>
</template>

<script lang="ts">
import 'lib/assets/styles/pages/card.css';
import {
  computed, defineComponent, PropType,
} from 'vue';
import { useRoute } from 'vue-router';
import { useTranslate } from 'lib/utils/core/translate';
import type { CardConfig } from 'lib/types/configs';
import PageHeader from '../components/page-header.vue';
import Dynamic from '../components/dynamic.vue';
import CardForm from '../components/form/card-form.vue';

export default defineComponent({
  name: 'CardPage',
  components: { PageHeader, CardForm, Dynamic },
  props: {
    config: {
      type: Object as PropType<CardConfig<any>>,
      required: true,
    },
    emptyCard: {
      type: Boolean,
      default: false,
    },
    entityId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  setup (props) {
    const { customT, t } = useTranslate();
    const route = useRoute();
    const cardId = computed(() => props.entityId || route.params.id);
    const isNew = computed<boolean>(() => props.emptyCard || cardId.value === 'new' || !!props.config.alwaysCreate);

    return {
      customT,
      t,
      cardId,
      isNew,
      pageName: `page-${route.name as string}`,
    };
  },
});
</script>
