<template>
  <main :class="{'sidebar-collapsed': sidebarCollapsed}" class="main-layout">
    <Header
      v-model:sidebar="sidebarOpen"
      :title="activeRoute ? activeRoute.title : ''"
    />

    <Sidebar
      :class="{open: sidebarOpen}"
      :routing="routes"
      :active-route="activeRoute"
    />

    <div class="main-layout_content">
      <section class="page">
        <router-view :key="activeRoute && activeRoute.route.name" />
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import 'styles/layouts/main.css';
import {
  computed, defineComponent, ref,
} from 'vue';
import { useRoute } from 'vue-router';
import type { RouteOrGroup } from 'core/types/configs';
import useStore from 'core/controllers/store/store';
import Header from '../components/header.vue';
import Sidebar from '../components/sidebar.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    Sidebar,
    Header,
  },
  setup () {
    const route = useRoute();
    const store = useStore();

    const sidebarOpen = ref<boolean>(false);
    const sidebarCollapsed = computed<boolean>(() => store.state.sidebarCollapsed);

    const routes = store.state.project.routes.routes;
    const activeRoute = computed<RouteOrGroup>(() => routes.find((item) => item.route?.name === route.name) || null);

    return {
      sidebarCollapsed,
      sidebarOpen,
      activeRoute,
      routes,
    };
  },
});
</script>
