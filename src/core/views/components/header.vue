<template>
  <header class="header">
    <div class="header_logo">
      <h1>{{ projectName }}</h1>
    </div>

    <nav class="header_nav">
      <div class="header_left">
        <h2>
          {{ customT(title) }}
        </h2>
      </div>

      <div v-if="Object.keys(allLanguages).length > 1" class="header_right">
        <el-dropdown size="small" trigger="hover">
          <template #default>
            <el-button size="mini" circle>
              <svg-icon name="globe" is-core />
            </el-button>
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

        <el-dropdown size="small" trigger="hover">
          <template #default>
            <el-button size="mini" circle>
              <svg-icon name="user" is-core />
            </el-button>
          </template>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">{{ t('core.header.logout') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-button
          size="mini"
          circle
          class="header_right_burger"
          @click="toggleOpen"
        >
          <svg-icon name="menu" is-core />
        </el-button>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import 'styles/components/header.css';
import { defineComponent, PropType, ref } from 'vue';
import useStore from 'core/controllers/store/store';
import { useRouter } from 'vue-router';
import { TranslateData, useTranslate } from 'core/utils/translate';
import { SupportedLanguages } from 'configs/translation';

export default defineComponent({
  name: 'Header',
  props: {
    title: {
      type: [String, Object] as PropType<TranslateData>,
      default: '',
    },
    sidebar: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:sidebar'],
  setup (props, context) {
    const { customT, t, locale } = useTranslate();
    const store = useStore();
    const router = useRouter();

    const open = ref<boolean>(props.sidebar);
    const projectName = store.state.project.manifest.name;
    const allLanguages = store.state.project.languages;

    const toggleOpen = () => {
      const newVal = !open.value;
      open.value = newVal;
      context.emit('update:sidebar', newVal);
    };

    const logout = () => {
      store.dispatch('logout');
      router.push({ name: store.state.project.routes.global.homeNoAuthName });
    };

    const changeLang = (lang: SupportedLanguages) => {
      store.dispatch('changeLanguage', lang);
      locale.value = lang;
    };

    return {
      t,
      customT,
      open,
      projectName,
      allLanguages,
      changeLang,
      toggleOpen,
      logout,
    };
  },
});
</script>
