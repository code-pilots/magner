import type {
  ManifestController, RouterController, StoreController, TranslationController,
} from 'core/controllers';
import type { DevelopmentConfig } from 'core/types/configs';

export interface ProjectConfig {
  manifest: ManifestController,

  routing: RouterController,
  store: StoreController,
  i18n: TranslationController,

  development: DevelopmentConfig,
}
