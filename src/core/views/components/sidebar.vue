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
          <el-submenu
            v-if="route.group"
            :key="route.name"
            :index="route.name"
          >
            <template #title>
              <svg-icon :name="route.icon" class="el-icon-margin-right" />
              <span>{{ customT(route.title) }}</span>
            </template>
            <template v-for="nested in route.routes">
              <el-menu-item
                v-if="nested.visible"
                :key="nested.route.name"
                :index="nested.route.name"
                class="sidebar_menu_item"
              >
                <svg-icon :name="nested.icon" class="el-icon-no-icon-just-kiddin" />
                <template #title>
                  <span class="sidebar_menu_item_title">
                    {{ customT(nested.title) }}
                  </span>
                </template>
              </el-menu-item>
            </template>
          </el-submenu>

          <el-menu-item
            v-else-if="route.visible"
            :key="route.route.name"
            :index="route.route.name"
            class="sidebar_menu_item"
          >
            <svg-icon :name="route.icon" class="el-icon-no-icon-just-kiddin" />
            <template #title>
              <span class="sidebar_menu_item_title">
                {{ customT(route.title) }}
              </span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>

    <el-button class="sidebar_toggle" @click="toggleCollapse">
      <svg-icon name="chevrons" :rotate="isCollapsed ? 'right' : 'left'" />
      {{ isCollapsed ? '' : t('core.sidebar.collapse') }}
    </el-button>
  </nav>
</template>

<script lang="ts">
import 'styles/components/sidebar.css';
import { computed, defineComponent, PropType } from 'vue';
import { useTranslate } from 'core/utils/translate';
import { useRouter } from 'vue-router';
import { CustomRoute } from 'core/types/configs';
import useStore from 'core/controllers/store/store';
import useMobile from 'core/utils/is-mobile';
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
    const { customT, t } = useTranslate();
    const isMobile = useMobile();
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
      t,
      isCollapsed,
      isMobile,
      customT,
      toggleCollapse,
      navigate,
    };
  },
});
</script>
