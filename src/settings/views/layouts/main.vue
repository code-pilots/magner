<template>
  <main :class="{'sidebar-collapsed': sidebarCollapsed}" class="main-layout">
    <Header v-model:sidebar="sidebarOpen" title="Something" />
    <Sidebar v-model:collapsed="sidebarCollapsed" :class="{open: sidebarOpen}" />

    <div class="main-layout_content">
      <section>
        <router-view />
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import 'styles/layouts/main.css';
import { defineComponent, ref } from 'vue';
import Header from 'settings/views/components/header.vue';
import Sidebar from 'settings/views/components/sidebar.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    Sidebar,
    Header,
  },
  setup () {
    const sidebarCollapsed = ref<boolean>(false);
    const sidebarOpen = ref<boolean>(false);

    return {
      sidebarCollapsed,
      sidebarOpen,
    };
  },
});
</script>
