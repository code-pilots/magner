import { createApp } from 'vue';
import ElementPlus from 'element-plus';

import type { StoreController } from 'settings/controllers/store';
import type { RouterController } from 'settings/controllers/router';

import App from 'settings/views/app.vue';
import SvgIcon from 'settings/views/components/icon.vue';

/**
 * Import all global styles. Does not contain component-related styles
 * which are imported directly to those components.
 */
import 'styles/variables.css';
import 'styles/normalize.css';
import 'styles/breakpoints.css';
import 'styles/ui.css';
import 'styles/typography.css';

export const mainController = (router: RouterController, store: StoreController) => {
  /** Register Vue 3 application with router, store, Element and useful directives. */
  createApp(App)
    .use(ElementPlus)
    .component('SvgIcon', SvgIcon)
    .use(...store)
    .use(router)
    .mount('#app');
};
