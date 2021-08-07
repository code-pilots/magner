import type { Router } from 'vue-router';
import type { StoreType } from 'core/controllers/store/store';
import type { I18n } from 'vue-i18n';

export interface GlobalValues {
  router: Router,
  store: StoreType,
  t: I18n['global']['t'],
}

const globalValues = {} as GlobalValues;

export default globalValues;
