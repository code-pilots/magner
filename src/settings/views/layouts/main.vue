<template>
  <main class="main-layout">
    <Header />
    <section class="main-layout_section">
      <router-view />
    </section>
  </main>
</template>

<script lang="ts">
import 'styles/layouts/main.css';
import { defineComponent } from 'vue';
import Sidebar from 'settings/views/components/sidebar.vue';
import Header from 'settings/views/components/header.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    Header,
    Sidebar,
  },
});
</script>
