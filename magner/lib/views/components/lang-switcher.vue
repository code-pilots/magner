<template>
  <el-dropdown
    trigger="hover"
  >
    <template #default>
      <el-button
        :icon="globeIcon"
        :circle="circle"
        :text="!circle"
      >
        <template v-if="!circle" #default>
          {{ allLanguages[locale] }}
        </template>
      </el-button>
    </template>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(value ,key) in allLanguages"
          :key="key"
          @click="changeLang(key)"
        >
          {{ value }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import GlobeIcon from 'lib/assets/icons/globe.svg';
import useStore from 'lib/controllers/store/store';
import { useTranslate } from 'lib/utils';

export default defineComponent({
  name: 'LangSwitcher',
  props: {
    circle: {
      type: Boolean,
      default: false,
    },
  },
  setup () {
    const store = useStore();
    const { locale } = useTranslate();

    const globeIcon = shallowRef(GlobeIcon);

    const allLanguages = store.state.project.languages;

    const changeLang = (lang: string) => {
      store.dispatch('changeLanguage', lang);
      locale.value = lang;
    };

    return {
      globeIcon,
      allLanguages,
      locale,
      changeLang,
    };
  },
});
</script>
