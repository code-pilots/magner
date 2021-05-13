<template>
  <section class="home-page">
    <h1>Hello from Admin template</h1>
  </section>
</template>

<script lang="ts">
import 'styles/pages/home.css';
import { defineComponent, onMounted } from 'vue';
import api from 'app/utils/api';

export default defineComponent({
  name: 'HomePage',
  setup () {
    onMounted(() => {
      api.auth.profile();
    });
  },
});
</script>
