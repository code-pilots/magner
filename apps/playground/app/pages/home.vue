<template>
  <section class="home-page">
    <h1>{{ t('home.hello') }}</h1>
  </section>
</template>

<script lang="ts">
import 'styles/home.css';
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
