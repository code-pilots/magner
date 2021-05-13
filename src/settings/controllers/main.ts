import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import App from 'settings/views/app.vue';
import router from 'settings/controllers/router';
import { store, injectionKey } from 'settings/controllers/store';

/**
 * Import all global styles. Does not contain component-related styles
 * which are imported directly to those components.
 */
import 'styles/variables.css';
import 'styles/normalize.css';
import 'styles/breakpoints.css';
import 'styles/ui.css';
import 'styles/typography.css';

/**
 * Register Vue 3 application with router, store, router and useful directives.
 */
createApp(App)
  .use(ElementPlus)
  .use(router)
  .use(store, injectionKey)
  .mount('#app');

const mainController = () => {

};

export default mainController;
