<template>
  <header class="header">
    <div class="header_logo">
      <template v-if="collapsed">
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
        <!-- TODO: Implement search -->
        <div v-if="false" class="header_left_search">
          <el-input placeholder="Поиск" type="text" />
        </div>
      </div>

      <div class="header_right">
        <el-dropdown v-if="Object.keys(allLanguages).length > 1" trigger="hover">
          <template #default>
            <el-button :icon="globeIcon" circle class="header_right_globe" />
          </template>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="lang in Object.entries(allLanguages)"
                :key="lang[0]"
                @click="changeLang(lang[0])"
              >
                {{ lang[1] }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

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
          circle
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
  defineComponent, PropType, ref, shallowRef,
} from 'vue';
import GlobeIcon from 'lib/assets/icons/globe.svg';
import UserIcon from 'lib/assets/icons/user.svg';
import { useRouter } from 'vue-router';
import useStore from 'lib/controllers/store/store';
import { useTranslate } from 'lib/utils/core/translate';
import { useMobile } from 'lib/utils/core/is-mobile';
import { MainLayoutProps } from 'lib/types/configs/routing/layouts';

export default defineComponent({
  name: 'Header',
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
    const globeIcon = shallowRef(GlobeIcon);
    const userIcon = shallowRef(UserIcon);

    const { customT, t, locale } = useTranslate();
    const store = useStore();
    const router = useRouter();
    const isMobile = useMobile();

    const open = ref<boolean>(props.sidebar);
    const allLanguages = store.state.project.languages;

    const toggleOpen = () => {
      const newVal = !open.value;
      open.value = newVal;
      context.emit('update:sidebar', newVal);
    };

    const logout = async () => {
      await store.dispatch('logout');
      await store.state.project.development.logoutRequest(null);
      await router.push({ name: store.state.project.routes.global.homeNoAuthName });
    };

    const changeLang = (lang: string) => {
      store.dispatch('changeLanguage', lang);
      locale.value = lang;
    };

    return {
      userIcon,
      globeIcon,
      t,
      customT,
      isMobile,
      open,
      allLanguages,
      changeLang,
      toggleOpen,
      logout,
    };
  },
});
</script>
