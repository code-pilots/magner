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
          <el-submenu
            v-if="route.group"
            :key="route.name"
            :index="route.name"
          >
            <template #title>
              <svg-icon :name="route.icon" class="el-icon-margin-right" />
              <span>{{ route.title }}</span>
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
                    {{ nested.title }}
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
                {{ route.title }}
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
import { useI18n } from 'vue-i18n';
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
    const { t } = useI18n();
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
      toggleCollapse,
      navigate,
    };
  },
});
</script>
