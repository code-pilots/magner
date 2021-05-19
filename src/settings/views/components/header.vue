<template>
  <header class="header">
    <div class="header_left">
      <h1 class="header_left_logo">Artebido</h1>

      {{ title }}
    </div>

    <div class="header_right">
      <el-button size="mini" circle>
        <svg-icon name="user" />
      </el-button>

      <el-button
        size="mini"
        circle
        class="header_left_burger"
        @click="toggleOpen"
      >
        <svg-icon name="menu" />
      </el-button>
    </div>
  </header>
</template>

<script lang="ts">
import 'styles/components/header.css';
import { defineComponent, ref } from 'vue';
import SvgIcon from 'settings/views/components/icon.vue';

export default defineComponent({
  name: 'Header',
  components: {
    SvgIcon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    sidebar: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:sidebar'],
  setup (props, context) {
    const open = ref<boolean>(props.sidebar);

    const toggleOpen = () => {
      const newVal = !open.value;
      open.value = newVal;
      context.emit('update:sidebar', newVal);
    };

    return {
      open,
      toggleOpen,
    };
  },
});
</script>
