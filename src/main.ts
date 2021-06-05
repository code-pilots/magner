import { initMagner } from 'settings/controllers';

import store from 'configs/store';
import router from 'configs/routing';

import 'element-plus/lib/theme-chalk/index.css';

initMagner(router, store);
