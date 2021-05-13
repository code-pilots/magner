import { createApp } from 'vue';
import App from 'app/app.vue';
import router from 'app/router';
import { store, injectionKey } from 'app/store';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

/**
 * Import all global styles. Does not contain component-related styles
 * which are imported directly to those components.
 */
import './app/assets/styles/variables.css';
import './app/assets/styles/normalize.css';
import './app/assets/styles/breakpoints.css';
import './app/assets/styles/ui.css';
import './app/assets/styles/typography.css';

/**
 * Register Vue 3 application with router, store, router and useful directives.
 */
createApp(App)
  .use(ElementPlus)
  .use(router)
  .use(store, injectionKey)
  .mount('#app');
