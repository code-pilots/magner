<template>
  <nav :class="{collapsed: isCollapsed}" class="sidebar">
    <el-scrollbar class="sidebar_scroll">
      <el-menu
        :collapse="isCollapsed"
        :default-active="activeRoute ? activeRoute.route.name : null"
        class="sidebar_menu"
        @select="navigate"
      >
        <template v-for="route in routing">
          <el-menu-item
            v-if="route.visible"
            :key="route.route.name"
            :index="route.route.name"
            class="sidebar_menu_item"
          >
            <svg-icon :name="route.icon" class="el-icon-no-icon-just-kiddin" />
            <template #title>
              <span class="sidebar_menu_item_title">
                {{ route.title }}
              </span>
            </template>
          </el-menu-item>
        </template>
        <!-- TODO: Implement routing children
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
        </el-submenu>
        -->
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
import { defineComponent, PropType, ref } from 'vue';
import SvgIcon from '../../views/components/icon.vue';
import { CustomRoute } from '../../types/configs';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Sidebar',
  components: { SvgIcon },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    routing: {
      type: Array as PropType<CustomRoute[]>,
      required: true,
    },
    activeRoute: {
      type: Object as PropType<CustomRoute|null>,
      default: null,
    },
  },
  emits: ['update:collapsed'],
  setup (props, context) {
    const router = useRouter();

    const isCollapsed = ref<boolean>(props.collapsed);

    const toggleCollapse = () => {
      const newVal = !isCollapsed.value;
      isCollapsed.value = newVal;
      context.emit('update:collapsed', newVal);
    };

    const navigate = (route: string) => {
      router.push({ name: route });
    };

    return {
      isCollapsed,
      toggleCollapse,
      navigate,
    };
  },
});
</script>
