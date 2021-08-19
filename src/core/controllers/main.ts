import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import type { ProjectConfig } from 'core/types/configs';
import globalValues from 'core/global';

import App from 'core/views/app.vue';
import SvgIcon from 'core/views/components/icon.vue';

/**
 * Import all global styles. Does not contain component-related styles
 * which are imported directly to those components.
 */
import 'styles/variables.css';
import 'styles/normalize.css';
import 'styles/breakpoints.css';
import 'styles/ui.css';
import 'styles/typography.css';

export const mainController = (project: ProjectConfig) => {
  const store = project.store();
  globalValues.store = store[0];

  globalValues.manifest = project.manifest();
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
