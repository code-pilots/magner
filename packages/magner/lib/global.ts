import type { Router } from 'vue-router';
import type { Language } from 'element-plus/lib/locale';
import type { I18n } from 'vue-i18n';
import type { StoreType } from './controllers/store/store';
import type { DevelopmentConfig, ManifestConfig, RoutingConfig } from './types/configs';
import type { LStorage } from './utils/core/local-storage';

export interface GlobalValues {
  manifest: ManifestConfig,
  store: StoreType,
  development: DevelopmentConfig,

  router: Router,
  routes: RoutingConfig,

  t: I18n['global']['t'],
  locales: Record<string, Language>,
  languages: Record<string, string>,

  lstorage: LStorage,
}

const globalValues = {} as GlobalValues;

export default globalValues;
