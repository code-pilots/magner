<template>
  <Dynamic :request="config.getRequest" :data="cardId" :disabled="isNew">
    <template #default="{response, loading}">
      <section v-loading="loading" class="card-page" :class="pageName">
        <div v-if="config.title || config.tabs" class="card-page_header">
          <h1 class="card-page_header_title">
            {{ customT(config.title) }}
          </h1>
          <el-tabs v-if="config.tabs" type="card">
            <el-tab-pane
              v-for="(tab, i) in config.tabs"
              :key="i"
              :name="i.toString()"
            >
              <template #label>
                <router-link v-if="!tab.active" :to="typeof tab.link === 'function' ? tab.link(response) : tab.link">
                  {{ customT(tab.label) }}
                </router-link>
                <span v-else>{{ customT(tab.label) }}</span>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>

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
import '../../assets/styles/pages/card.css';
import {
  computed, defineComponent, PropType,
} from 'vue';
import { useRoute } from 'vue-router';
import { useTranslate } from '../../utils/core/translate';
import type { CardConfig } from '../../types/configs';
import Dynamic from '../components/dynamic.vue';
import CardForm from '../components/form/card-form.vue';

export default defineComponent({
  name: 'CardPage',
  components: { CardForm, Dynamic },
  props: {
    config: {
      type: Object as PropType<CardConfig>,
      required: true,
    },
  },
  setup (props) {
    const { customT, t } = useTranslate();
    const route = useRoute();
    const cardId = computed(() => route.params.id);
    const isNew = computed<boolean>(() => cardId.value === 'new' || !!props.config.alwaysCreate);

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
