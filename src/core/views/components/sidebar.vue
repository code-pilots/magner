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
import { computed, defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { CustomRoute } from 'core/types/configs';
import useStore from 'core/controllers/store/store';
import SvgIcon from './icon.vue';

export default defineComponent({
  name: 'Sidebar',
  components: { SvgIcon },
  props: {
    routing: {
      type: Array as PropType<CustomRoute[]>,
      required: true,
    },
    activeRoute: {
      type: Object as PropType<CustomRoute|null>,
      default: null,
    },
  },
  setup () {
    const router = useRouter();
    const store = useStore();

    const isCollapsed = computed<boolean>(() => store.state.sidebarCollapsed);

    const toggleCollapse = () => {
      store.dispatch('toggleSidebar');
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
