import { createApp } from 'vue';
import App from './app.vue';
import router from './router';
import { store, injectionKey } from './store';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

/**
 * Import all global styles. Does not contain component-related styles
 * which are imported directly to those components.
 */
import './assets/styles/variables.css';
import './assets/styles/normalize.css';
import './assets/styles/breakpoints.css';
import './assets/styles/ui.css';
import './assets/styles/typography.css';

/**
 * Register Vue 3 application with router, store, router and useful directives.
 */
createApp(App)
  .use(ElementPlus)
  .use(router)
  .use(store, injectionKey)
  .mount('#app');
