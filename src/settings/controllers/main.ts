import { createApp } from 'vue';
import ElementPlus from 'element-plus';

import App from 'settings/views/app.vue';
import router from 'settings/controllers/router';
import { store, injectionKey } from 'settings/controllers/store';
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

const mainController = () => {
  /** Register Vue 3 application with router, store, Element and useful directives. */
  createApp(App)
    .use(ElementPlus)
    .component('SvgIcon', SvgIcon)
    .use(router)
    .use(store, injectionKey)
    .mount('#app');
};

export default mainController;
