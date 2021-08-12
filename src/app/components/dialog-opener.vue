<template>
  <div>
    <el-button type="primary" @click="handleOpen">Create city</el-button>
    <span v-if="city">{{ city }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DialogOpener',
  props: {
    city: {
      type: String,
      default: '',
    },
  },
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

<style scoped>
div {
  width: 100%;
  display: flex;
}

.el-button {
  max-width: 200px ;
  margin-right: 12px;
}
</style>
