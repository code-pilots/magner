<template>
  <el-button type="primary" @click="handleOpen">Open me</el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DialogOpener',
  props: {},
  emits: ['action'],
  setup (props, context) {
    const handleOpen = () => {
      context.emit('action', { type: 'click' });
    };

    return {
      handleOpen,
    };
  },
});
</script>
