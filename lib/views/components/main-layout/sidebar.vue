<template>
  <nav :class="{collapsed: isCollapsed && !isMobile}" class="sidebar">
    <el-scrollbar class="sidebar_scroll">
      <el-menu
        :collapse="isCollapsed && !isMobile"
        :default-active="activeRoute ? activeRoute.name : null"
        class="sidebar_menu"
        @select="navigate"
      >
        <template v-for="route in grouped">
          <el-menu-item
            v-if="!route.routes && isVisible(route)"
            :key="route.name"
            :index="route.name"
            class="sidebar_menu_item"
          >
            <svg-icon :icon="route.icon" class="el-icon-no-icon-just-kiddin" />
            <template #title>
              <span class="sidebar_menu_item_title">
                {{ customT(route.title) }}
              </span>
            </template>
          </el-menu-item>

          <el-sub-menu
            v-else-if="route.routes"
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
                :key="nested.name"
                :index="nested.name"
                class="sidebar_menu_item"
              >
                <svg-icon :icon="nested.icon" class="el-icon-no-icon-just-kiddin" />
                <template #title>
                  <span class="sidebar_menu_item_title">
                    {{ customT(nested.title) }}
                  </span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
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
import 'lib/assets/styles/components/sidebar.css';
import { computed, defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import type { MainLayoutProps, MainLayoutRoute, MainLayoutGroup } from 'lib/types/configs/routing/layouts';
import { useTranslate, useMobile } from 'lib/utils';
import useStore from 'lib/controllers/store/store';

export default defineComponent({
  name: 'Sidebar',
  props: {
    routing: {
      type: Array as PropType<MainLayoutRoute[]>,
      required: true,
    },
    activeRoute: {
      type: Object as PropType<MainLayoutRoute | null>,
      default: null,
    },
    groups: {
      type: Array as PropType<MainLayoutProps['groups']>,
      default: () => ([]),
    },
  },
  setup (props) {
    const { customT, t } = useTranslate();
    const isMobile = useMobile();
    const router = useRouter();
    const store = useStore();

    const isCollapsed = computed<boolean>(() => store.state.sidebarCollapsed);
    const noBackend = computed<boolean>(() => store.state.project.development.noBackendMode || false);
    const role = computed<string>(() => store.state.role as string);
    const token = computed<string>(() => store.state.token as string);

    /** Go through all sidebar routes and merge them in defined groups */
    const grouped = computed<(MainLayoutRoute | MainLayoutGroup<MainLayoutRoute>)[]>(() => props.routing
      .reduce((accum, current) => {
        let isInGroup = false;
        props.groups?.forEach((group) => {
          if (group.routes.includes(current.name)) {
            isInGroup = true;
            const groupInAccum = accum
              .find((acGroup) => acGroup.name === group.name) as MainLayoutGroup<MainLayoutRoute> | null;

            if (groupInAccum) {
              groupInAccum.routes.push(current);
            } else {
              accum.push({
                ...group,
                routes: [current],
              });
            }
          }
        });

        if (!isInGroup) {
          accum.push(current);
        }

        return accum;
      }, [] as (MainLayoutRoute | MainLayoutGroup<MainLayoutRoute>)[]));

    const isVisible = (route: MainLayoutRoute): boolean => {
      if (!route.visible) return false;
      if (noBackend.value || !route.roles) return true;
      if (route.roles === true && token.value) return true;
      return (route.roles as string[]).includes(role.value);
    };

    const toggleCollapse = () => {
      store.dispatch('toggleSidebar');
    };

    const navigate = (route: string) => {
      const routeTo = props.routing.find((item) => item.name === route);
      router.push(routeTo?.link ? routeTo.link : { name: route });
    };

    return {
      t,
      isCollapsed,
      isMobile,
      role,
      grouped,
      isVisible,
      customT,
      toggleCollapse,
      navigate,
    };
  },
});
</script>
