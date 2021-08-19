<template>
  <section class="home-page">
    <h1>{{ t('home.hello') }}</h1>

    <p>{{ t('home.custom') }}</p>

    <img src="/cat.gif" alt="funny cat">

    <router-link :to="{ name: 'patients' }" class="link">
      <el-button type="primary">{{ t('home.explore') }}</el-button>
    </router-link>
  </section>
</template>

<script lang="ts">
import 'assets/styles/home.css';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'HomePage',
  setup () {
    const { t } = useI18n();

    return {
      t,
    };
  },
});
</script>
