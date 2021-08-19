import type { Router } from 'vue-router';
import type { StoreType } from 'core/controllers/store/store';
import type { I18n } from 'vue-i18n';
import type { Language } from 'element-plus/lib/locale';
import type { DevelopmentConfig, ManifestConfig, RoutingConfig } from 'core/types/configs';

export interface GlobalValues {
  manifest: ManifestConfig,
  store: StoreType,
  development: DevelopmentConfig,

  router: Router,
  routes: RoutingConfig,

  t: I18n['global']['t'],
  locales: Record<string, Language>,
  languages: Record<string, string>,
}

const globalValues = {} as GlobalValues;

export default globalValues;
