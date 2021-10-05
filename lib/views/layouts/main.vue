<template>
  <main :class="{'sidebar-collapsed': sidebarCollapsed}" class="main-layout">
    <Header
      v-model:sidebar="sidebarOpen"
      :title="activeRoute ? activeRoute.type === 'group' ? activeRoute.title : activeRoute.route.title : ''"
    />

    <Sidebar
      :class="{open: sidebarOpen}"
      :routing="routes"
      :active-route="activeRoute"
    />

    <div class="main-layout_content">
      <section class="page">
        <router-view
          :key="activeRoute ? activeRoute.type === 'group' ? activeRoute.name : activeRoute.route.path : ''"
        />
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import '../../assets/styles/layouts/main.css';
import {
  computed, defineComponent, ref,
} from 'vue';
import { useRoute } from 'vue-router';
import type { FinalRoute } from 'lib/types/configs/routing/routing';
import useStore from 'lib/controllers/store/store';
import Header from 'lib/views/components/main-layout/header.vue';
import Sidebar from 'lib/views/components/main-layout/sidebar.vue';

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
    // TODO: fix (cannot find nested routes)
    const activeRoute = computed<FinalRoute>(() => routes.find((item) => item.route?.name === route.name) || null);

    return {
      sidebarCollapsed,
      sidebarOpen,
      activeRoute,
      routes,
    };
  },
});
</script>
