<template>
  <section class="home-page">
    <h1>Hello from Admin template!</h1>

    <p>This is a fully custom page. And you can make your own too!</p>

    <img src="/cat.gif" alt="funny cat">

    <router-link :to="{ name: 'patients' }" class="link">
      <el-button type="secondary">Explore table</el-button>
    </router-link>
  </section>
</template>

<script lang="ts">
import 'app/assets/styles/home.css';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
});
</script>
