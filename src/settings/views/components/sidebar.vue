<template>
  <nav :class="{collapsed: isCollapsed}" class="sidebar">
    <el-scrollbar class="sidebar_scroll">
      <el-menu
        :collapse="isCollapsed"
        default-active="2"
        class="sidebar_menu"
      >
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <template #title>Navigator Four</template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>

    <el-button class="sidebar_toggle" @click="toggleCollapse">
      <svg-icon name="chevrons" :rotate="isCollapsed ? 'right' : 'left'" />
      {{ isCollapsed ? '' : 'Collapse' }}
    </el-button>
  </nav>
</template>

<script lang="ts">
import 'styles/components/sidebar.css';
import { defineComponent, ref } from 'vue';
import SvgIcon from 'settings/views/components/icon.vue';

export default defineComponent({
  name: 'Sidebar',
  components: {SvgIcon},
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:collapsed'],
  setup (props, context) {
    const isCollapsed = ref<boolean>(props.collapsed);

    const toggleCollapse = () => {
      const newVal = !isCollapsed.value;
      isCollapsed.value = newVal;
      context.emit('update:collapsed', newVal);
    };

    return {
      isCollapsed,
      toggleCollapse,
    };
  },
});
</script>
