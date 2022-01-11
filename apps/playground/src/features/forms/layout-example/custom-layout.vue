<template>
  <div class="el-card is-always-shadow">
    <h3>{{ customT(layout.title) }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useTranslate } from 'magner';

export default defineComponent({
  name: 'CustomLayout',
  props: {
    layout: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
  },
  setup () {
    const { customT } = useTranslate();

    return {
      customT,
    };
  },
});
</script>

<style scoped>
div {
  width: 100%;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
