<template>
  <div v-if="header.title || tabs.tabs.length" class="magner-page-header">
    <h1 class="magner-page-header_title">
      <template v-if="header.title">{{ customT(header.title) }}</template>
    </h1>

    <el-tabs
      v-if="header.tabs && tabs.tabs.length"
      :model-value="tabs.activeIndex"
      type="card"
      class="magner-page-header_tabs"
    >
      <el-tab-pane
        v-for="tab in tabs.tabs"
        :key="tab.index"
        :name="tab.index"
      >
        <template #label>
          <router-link v-if="!tab.active" :to="typeof tab.link === 'function' ? tab.link(route) : tab.link">
            {{ customT(tab.label) }}
          </router-link>
          <span v-else>{{ customT(tab.label) }}</span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import '../../assets/styles/components/page-header.css';
import { computed, defineComponent, PropType } from 'vue';
import { useRoute } from 'vue-router';
import { useTranslate } from 'lib/utils/core/translate';
import type { PageHeader } from 'lib/types/configs/pages/shared';

export default defineComponent({
  name: 'PageHeader',
  components: {},
  props: {
    header: {
      type: Object as PropType<PageHeader>,
      required: true,
    },
  },
  emits: [],
  setup (props) {
    const { customT } = useTranslate();
    const route = useRoute();

    const tabs = computed(() => ({
      tabs: props.header.tabs?.map((tab, index) => ({ ...tab, index: index.toString() })) || [],
      activeIndex: props.header.tabs?.findIndex((tab) => tab.active)?.toString() || -1,
    }));

    return {
      customT,
      route,
      tabs,
    };
  },
});
</script>
