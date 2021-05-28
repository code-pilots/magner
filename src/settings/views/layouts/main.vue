<template>
  <main :class="{'sidebar-collapsed': sidebarCollapsed}" class="main-layout">
    <Header
      v-model:sidebar="sidebarOpen"
      :title="activeRoute ? activeRoute.title : ''"
    />

    <Sidebar
      v-model:collapsed="sidebarCollapsed"
      :class="{open: sidebarOpen}"
      :routing="routingConfig.routes"
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
import Header from 'settings/views/components/header.vue';
import Sidebar from 'settings/views/components/sidebar.vue';
import routingConfig from 'configs/routing';

export default defineComponent({
  name: 'MainLayout',
  components: {
    Sidebar,
    Header,
  },
  setup () {
    const route = useRoute();

    const sidebarCollapsed = ref<boolean>(false);
    const sidebarOpen = ref<boolean>(false);

    const activeRoute = computed(() => routingConfig.routes.find((item) => item.route?.name === route.name) || null);

    return {
      sidebarCollapsed,
      sidebarOpen,
      activeRoute,
      routingConfig,
    };
  },
});
</script>
