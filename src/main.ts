import { initMagner } from 'core/controllers';

import store from 'configs/store';
import translation from 'configs/translation';
import router from 'configs/routing';
import 'configs/project';

import 'element-plus/lib/theme-chalk/index.css';

initMagner(router, store, translation);
