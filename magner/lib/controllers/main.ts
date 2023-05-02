import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import type { ProjectConfig } from 'lib/types/configs';
import globalValues from 'lib/global';

import App from 'lib/views/app.vue';
import SvgIcon from 'lib/views/components/icon.vue';

/**
 * Import all global styles. Does not contain component-related styles
 * which are imported directly to those components.
 */
import '../assets/styles/variables.css';
import '../assets/styles/normalize.css';
import '../assets/styles/breakpoints.css';
import '../assets/styles/ui.css';
import '../assets/styles/typography.css';
import '../assets/styles/fonts.css';

import lstorageController from 'lib/utils/core/local-storage';
import { storeController } from './store';

export const mainController = (project: ProjectConfig) => {
  globalValues.manifest = project.manifest();
  globalValues.lstorage = lstorageController(`magner-${globalValues.manifest.short_name}`);

  const store = storeController()();
  globalValues.store = store[0];

  globalValues.development = project.development();

  const i18n = project.i18n();
  globalValues.t = i18n.i18n.global.t;
  globalValues.locales = i18n.config.elLocales;
  globalValues.languages = i18n.config.languages;
  globalValues.store.dispatch('changeLanguage', i18n.config.mainLanguage);

  const router = project.routing();
  globalValues.router = router.router;
  globalValues.routes = router.routing;

  globalValues.store.dispatch('changeProject', globalValues);

  /** Register Vue 3 application with router, store, Element and useful directives. */
  createApp(App)
    .use(ElementPlus)
    .component('SvgIcon', SvgIcon)
    .use(...store)
    .use(router.router)
    .use(i18n.i18n)
    .mount('#app');
};
