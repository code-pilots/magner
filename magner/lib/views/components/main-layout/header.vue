<template>
  <header class="header js-header">
    <div class="header_logo">
      <template v-if="collapsed || isMobile">
        <svg-icon v-if="settings.headerCollapsedIcon" :icon="settings.headerCollapsedIcon" size="inherit" />
        <h1 v-else-if="settings.headerTitle">{{ settings.headerTitle.charAt(0) || '' }}</h1>
        <svg-icon v-else core="logo-light" size="inherit" />
      </template>
      <template v-else>
        <svg-icon v-if="settings.headerIcon" :icon="settings.headerIcon" size="inherit" />
        <h1 v-else-if="settings.headerTitle">{{ settings.headerTitle }}</h1>
        <svg-icon v-else core="brand-light" size="inherit" />
      </template>
    </div>

    <nav class="header_nav">
      <div class="header_left">
        <el-button v-if="togglePositionTop" class="header_toggle" @click="toggleCollapse">
          <svg-icon :rotate="isCollapsed ? 'right' : 'left'" core="chevrons" size="full" />
        </el-button>

        <!-- TODO: Implement search -->
        <div v-if="false" class="header_left_search">
          <el-input placeholder="Поиск" type="text" />
        </div>
      </div>

      <div class="header_right">
        <el-link
          v-if="appVersion"
          :disabled="!changeLogRoute"
          type="default"
          @click="toChangeLog"
        >
          {{ appVersion }}
        </el-link>

        <LangSwitcher
          v-if="isMultipleLanguages"
          circle
        />

        <div v-if="userName" class="header_right_user-name">
          {{ userName }}
        </div>

        <el-dropdown trigger="hover">
          <template #default>
            <el-button
              :icon="userIcon"
              type="primary"
              circle
              class="header_right_user"
            />
          </template>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">{{ t('core.header.logout') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-button
          v-if="isMobile"
          class="header_right_burger"
          @click="toggleOpen"
        >
          <svg-icon core="menu" />
        </el-button>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import '../../../assets/styles/components/header.css';
import {
  defineComponent,
  PropType,
  shallowRef,
  computed,
} from 'vue';
import { useRouter } from 'vue-router';
import useStore from 'lib/controllers/store/store';
import { useTranslate } from 'lib/utils/core/translate';
import { useMobile } from 'lib/utils/core/is-mobile';
import { MainLayoutProps, RouteLayout } from 'lib/types/configs/routing/layouts';
import { useClickOutside } from 'lib/utils/composables/clickOutside';
import { FinalNoLayoutRoute } from 'lib/types';

import UserIcon from 'lib/assets/icons/user.svg';
import LangSwitcher from 'lib/views/components/lang-switcher.vue';

export default defineComponent({
  name: 'MainHeader',
  components: { LangSwitcher },
  props: {
    settings: {
      type: Object as PropType<MainLayoutProps>,
      required: true,
    },
    sidebar: {
      type: Boolean,
      default: false,
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:sidebar'],
  setup (props, context) {
    const userIcon = shallowRef(UserIcon);

    const { customT, t } = useTranslate();
    const store = useStore();
    const router = useRouter();
    const isMobile = useMobile();

    const isMultipleLanguages = computed(() => store.getters.isMultipleLanguages);
    const togglePositionTop = computed<boolean>(() => store.state.project.development.toggleBtnPositionTop || false);
    const userName = store.state.user?.name;
    const isCollapsed = computed<boolean>(() => store.state.sidebarCollapsed);
    const appVersion = store.state.project.development?.appVersion || null;
    const changeLogRoute = computed<FinalNoLayoutRoute | null>(() => {
      const routeLayout = store.state.project.routes.routes.find((routes) => routes.type === 'layout') as RouteLayout;
      return routeLayout?.layout.routes.find((r) => r.route.name === 'change-log') || null;
    });

    const toggleOpen = () => {
      store.dispatch('toggleMobileSidebarOpened');
    };

    const logout = async () => {
      await store.dispatch('logout');
      await store.state.project.development.logoutRequest(null);
      await router.push({ name: store.state.project.routes.global.homeNoAuthName });
    };

    const toChangeLog = () => {
      router.push({ name: changeLogRoute.value?.route.name });
    };

    useClickOutside('id-sidebar', '.header_right_burger', () => {
      if (props.sidebar) {
        toggleOpen();
      }
    });

    const toggleCollapse = () => {
      store.dispatch('toggleSidebarCollapsed');
    };

    return {
      userIcon,
      t,
      customT,
      isMobile,
      isMultipleLanguages,
      userName,
      isCollapsed,
      togglePositionTop,
      appVersion,
      changeLogRoute,
      toChangeLog,
      toggleOpen,
      toggleCollapse,
      logout,
    };
  },
});
</script>
