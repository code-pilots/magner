<template>
  <main :class="{'sidebar-collapsed': sidebarCollapsed}" class="main-layout">
    <Header
      v-model:sidebar="sidebarOpen"
      :collapsed="sidebarCollapsed"
      :settings="data"
    />

    <Sidebar
      :class="{open: sidebarOpen}"
      :routing="routes"
      :groups="data.sidebarGroups"
      :active-route="activeRoute"
    />

    <div class="main-layout_content">
      <section class="page">
        <router-view :key="activeRoute ? activeRoute.name : ''" />
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import '../../assets/styles/layouts/main.css';
import {
  computed, defineComponent, PropType, ref,
} from 'vue';
import { useRoute } from 'vue-router';
import type { MainLayoutProps, MainLayoutRoute } from 'lib/types/configs/routing/layouts';
import useStore from 'lib/controllers/store/store';
import Header from 'lib/views/components/main-layout/header.vue';
import Sidebar from 'lib/views/components/main-layout/sidebar.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    Sidebar,
    Header,
  },
  props: {
    routes: {
      type: Array as PropType<MainLayoutRoute[]>,
      default: () => ([]),
    },
    data: {
      type: Object as PropType<MainLayoutProps>,
      default: () => ({}),
    },
  },
  setup (props) {
    const route = useRoute();
    const store = useStore();

    const sidebarOpen = ref<boolean>(false);
    const sidebarCollapsed = computed<boolean>(() => store.state.sidebarCollapsed);

    const activeRoute = computed<MainLayoutRoute | null>(() => props.routes
      .find((item) => item.name === route.name) || null);

    return {
      sidebarCollapsed,
      sidebarOpen,
      activeRoute,
    };
  },
});
</script>
