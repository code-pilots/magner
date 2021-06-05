<template>
  <main :class="{'sidebar-collapsed': sidebarCollapsed}" class="main-layout">
    <Header
      v-model:sidebar="sidebarOpen"
      :title="activeRoute ? activeRoute.title : ''"
    />

    <Sidebar
      v-model:collapsed="sidebarCollapsed"
      :class="{open: sidebarOpen}"
      :routing="routes"
      :active-route="activeRoute"
    />

    <div class="main-layout_content">
      <section class="page">
        <router-view />
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import 'styles/layouts/main.css';
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import Header from '../../views/components/header.vue';
import Sidebar from '../../views/components/sidebar.vue';
import useStore from '../../controllers/store/store';

export default defineComponent({
  name: 'MainLayout',
  components: {
    Sidebar,
    Header,
  },
  setup () {
    const route = useRoute();
    const store = useStore();

    const sidebarCollapsed = ref<boolean>(false);
    const sidebarOpen = ref<boolean>(false);

    const routes = store.state.allRoutes;
    const activeRoute = computed(() => routes.find((item) => item.route?.name === route.name) || null);

    return {
      sidebarCollapsed,
      sidebarOpen,
      activeRoute,
      routes,
    };
  },
});
</script>
