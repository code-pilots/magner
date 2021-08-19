import type {
  DevelopmentController,
  ManifestController,
  RouterController,
  StoreController,
  TranslationController,
} from 'core/controllers';

export interface ProjectConfig {
  manifest: ManifestController,

  routing: RouterController,
  store: StoreController,
  i18n: TranslationController,

  development: DevelopmentController,
}
