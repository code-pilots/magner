<template>
  <div v-if="header.title || tabs.tabs.length" class="magner-page-header">
    <div class="magner-page-header_title-container">
      <h1 class="magner-page-header_title">
        <template v-if="header.title">{{ customT(header.title) }}</template>
      </h1>

      <span v-if="showFiltersBtn" class="magner-page-header_filters-btn" @click="toggleFilters">
        <svg-icon core="filter" />
      </span>
    </div>

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
import {
  computed, defineComponent, onBeforeUnmount, onMounted, PropType,
} from 'vue';
import { useRoute } from 'vue-router';
import { useTranslate } from 'lib/utils/core/translate';
import type { PageHeader } from 'lib/types/configs/pages/shared';
import useStore from 'lib/controllers/store/store';
import { isInWhiteList } from 'lib/utils/helpers/white-list';

export default defineComponent({
  name: 'PageHeader',
  components: {},
  props: {
    header: {
      type: Object as PropType<PageHeader>,
      required: true,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  emits: [],
  setup (props) {
    const { customT } = useTranslate();
    const route = useRoute();
    const store = useStore();

    const tabs = computed(() => ({
      tabs: props.header.tabs?.map((tab, index) => ({ ...tab, index: index.toString() })).filter((tab) => !props.isNew || (props.isNew && !tab.hideIfNew)) || [],
      activeIndex: props.header.tabs?.findIndex((tab) => tab.active)?.toString() || -1,
    }));

    const showFiltersBtn = computed<boolean>(() => store.state.hasFilters);

    const toggleFilters = () => {
      store.dispatch('toggleFiltersCollapsed');
    };

    const clickedOutside = (e: MouseEvent) => {
      if (showFiltersBtn.value && !store.state.filtersCollapsed) {
        const content = document.getElementById('id-table-page-top') || undefined;

        if (
          e.target
          && !(e.target as HTMLElement).closest('.magner-page-header_filters-btn')
          && !isInWhiteList(e.target, content)
        ) {
          toggleFilters();
        }
      }
    };

    onMounted(() => {
      document.addEventListener('click', clickedOutside);
    });
    onBeforeUnmount(() => {
      document.removeEventListener('click', clickedOutside);
    });

    return {
      customT,
      route,
      tabs,

      toggleFilters,
      showFiltersBtn,
    };
  },
});
</script>
