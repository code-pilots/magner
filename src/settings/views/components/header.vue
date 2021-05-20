<template>
  <header class="header">
    <div class="header_logo">
      <h1 class="header_left_logo">Artebido</h1>
    </div>

    <nav class="header_nav">
      <div class="header_left">
        <h2>
          {{ title }}
        </h2>
      </div>

      <div class="header_right">
        <el-dropdown size="small" trigger="hover">
          <template #default>
            <el-button
              size="mini"
              circle
            >
              <svg-icon name="user" />
            </el-button>
          </template>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Log out</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-button
          size="mini"
          circle
          class="header_right_burger"
          @click="toggleOpen"
        >
          <svg-icon name="menu" />
        </el-button>
      </div>
    </nav>
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
