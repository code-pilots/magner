<template>
  <div
    v-if="hasPageHeader"
    class="magner-page-header"
  >
    <div class="magner-page-header_title-container">
      <h1 class="magner-page-header_title">
        {{ title }}
      </h1>
      <el-tag
        v-if="tag && requestData[tag.name]"
        class="magner-page-header_tag"
        :type="tag.props.type ?? ''"
        :size="tag.props.size ?? 'default'"
        :effect="tag.props.effect ?? 'light'"
        :round="tag.props.round ?? false"
      >
        {{ requestData[tag.name] }}
      </el-tag>
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
          <router-link
            v-if="!tab.active"
            :to="typeof tab.link === 'function' ? tab.link(route) : tab.link"
          >
            {{ customT(tab.label) }}
          </router-link>
          <span v-else>
            {{ customT(tab.label) }}
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>

    <PageHeaderActions
      v-if="header.actions?.length"
      :actions="header.actions"
      :request-data="requestData"
      @action="emitAction"
    />
  </div>
</template>

<script lang="ts">
import '../../assets/styles/components/page-header.css';
import {
  computed, defineComponent, PropType,
} from 'vue';
import { useRoute } from 'vue-router';
import { useTranslate } from 'lib/utils/core/translate';
import type { PageHeader } from 'lib/types/configs/pages/shared';
import { ActionAction } from 'lib/types/utils/actions';
import PageHeaderActions from './page-header-actions.vue';

export default defineComponent({
  name: 'PageHeader',
  components: {
    PageHeaderActions,
  },
  props: {
    header: {
      type: Object as PropType<PageHeader>,
      required: true,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    requestData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['action'],
  setup (props, context) {
    const { customT } = useTranslate();
    const route = useRoute();

    const tabs = computed(() => ({
      tabs: props.header.tabs?.map((tab, index) => ({ ...tab, index: index.toString() })).filter((tab) => !props.isNew || (props.isNew && !tab.hideIfNew)) || [],
      activeIndex: props.header.tabs?.findIndex((tab) => tab.active)?.toString() || -1,
    }));

    const title = computed(() => {
      if (props.isNew && props.header.newTitle) {
        return customT(props.header.newTitle);
      }

      return props.header.title ? customT(props.header.title) : '';
    });

    const tag = computed(() => props.header.tag);

    const hasPageHeader = computed(() => title.value || tabs.value.tabs.length || tag.value);

    const emitAction = (action: ActionAction) => context.emit('action', action);

    return {
      customT,
      emitAction,

      hasPageHeader,
      route,
      tabs,
      title,
      tag,
    };
  },
});
</script>
