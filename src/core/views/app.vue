<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import useStore from 'core/controllers/store/store';

export default defineComponent({
  name: 'App',
  setup () {
    const store = useStore();
    const locale = computed(() => store.state.project.locales?.[store.state.language] || null);

    return {
      locale,
    };
  },
});
</script>
