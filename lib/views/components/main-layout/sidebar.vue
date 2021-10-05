<template>
  <nav :class="{collapsed: isCollapsed && !isMobile}" class="sidebar">
    <el-scrollbar class="sidebar_scroll">
      <el-menu
        :collapse="isCollapsed && !isMobile"
        :default-active="activeRoute ? activeRoute.route.name : null"
        class="sidebar_menu"
        @select="navigate"
      >
        <template v-for="route in routing">
          <el-sub-menu
            v-if="route.type === 'group' && isVisible(route)"
            :key="route.name"
            :index="route.name"
          >
            <template #title>
              <svg-icon :icon="route.icon" class="el-icon-margin-right" />
              <span>{{ customT(route.title) }}</span>
            </template>
            <template v-for="nested in route.routes">
              <el-menu-item
                v-if="isVisible(nested)"
                :key="nested.route.name"
                :index="nested.route.name"
                class="sidebar_menu_item"
              >
                <svg-icon :icon="nested.route.icon" class="el-icon-no-icon-just-kiddin" />
                <template #title>
                  <span class="sidebar_menu_item_title">
                    {{ customT(nested.route.title) }}
                  </span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>

          <el-menu-item
            v-else-if="isVisible(route)"
            :key="route.route.name"
            :index="route.route.name"
            class="sidebar_menu_item"
          >
            <svg-icon :icon="route.route.icon" class="el-icon-no-icon-just-kiddin" />
            <template #title>
              <span class="sidebar_menu_item_title">
                {{ customT(route.route.title) }}
              </span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>

    <el-button class="sidebar_toggle" @click="toggleCollapse">
      <svg-icon :rotate="isCollapsed ? 'right' : 'left'" core="chevrons" />
      {{ isCollapsed ? '' : t('core.sidebar.collapse') }}
    </el-button>
  </nav>
</template>

<script lang="ts">
import '../../../assets/styles/components/sidebar.css';
import { computed, defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import type { FinalRoute } from 'lib/types/configs/routing/routing';
import { useTranslate, useMobile } from 'lib/utils';
import useStore from 'lib/controllers/store/store';

export default defineComponent({
  name: 'Sidebar',
  props: {
    routing: {
      type: Array as PropType<FinalRoute[]>,
      required: true,
    },
    activeRoute: {
      type: Object as PropType<FinalRoute|null>,
      default: null,
    },
  },
  setup () {
    const { customT, t } = useTranslate();
    const isMobile = useMobile();
    const router = useRouter();
    const store = useStore();

    const isCollapsed = computed<boolean>(() => store.state.sidebarCollapsed);
    const noBackend = computed<boolean>(() => store.state.project.development.noBackendMode);
    const role = computed<string>(() => store.state.role);
    const token = computed<string>(() => store.state.token);

    const isVisible = (route: FinalRoute): boolean => {
      if (route.type === 'group') {
        return !route.roles || route.roles.includes(role.value);
      }

      if (!route.route.visible) return false;
      if (noBackend.value || !route.route.roles) return true;
      if (route.route.roles === true && token.value) return true;
      return (route.route.roles as string[]).includes(role.value);
    };

    const toggleCollapse = () => {
      store.dispatch('toggleSidebar');
    };

    const navigate = (route: string) => {
      router.push({ name: route });
    };

    return {
      t,
      isCollapsed,
      isMobile,
      role,
      isVisible,
      customT,
      toggleCollapse,
      navigate,
    };
  },
});
</script>
