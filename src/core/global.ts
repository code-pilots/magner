import type { Router } from 'vue-router';
import type { StoreType } from 'core/controllers/store/store';
import type { I18n } from 'vue-i18n';
import type { Language } from 'element-plus/lib/locale';

export interface GlobalValues {
  router: Router,
  store: StoreType,
  t: I18n['global']['t'],
  locales: Record<string, Language>,
}

const globalValues = {} as GlobalValues;

export default globalValues;
