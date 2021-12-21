<template>
  <el-config-provider :locale="locale">
    <MagnerModal />
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { computed, defineComponent, defineAsyncComponent } from 'vue';
import useStore from 'lib/controllers/store/store';

export default defineComponent({
  name: 'App',
  components: {
    MagnerModal: defineAsyncComponent(() => import('./components/modal.vue')),
  },
  setup () {
    const store = useStore();
    const locale = computed(() => store.state.project.locales?.[store.state.language] || null);

    return {
      locale,
    };
  },
});
</script>
