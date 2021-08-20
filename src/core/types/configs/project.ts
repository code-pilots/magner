import type {
  DevelopmentController,
  ManifestController,
  RouterController,
  StoreController,
  TranslationController,
} from 'core/controllers';
import type { SupportedAnalyzers } from 'core/analyzers';

export interface ProjectConfig {
  /** Static analyzers import your project configuration not to run the app, but to use it for
   * retrieving useful information like full routes list or backend advises. Cannot be used it production mode. */
  analyze?: SupportedAnalyzers,

  manifest: ManifestController,

  routing: RouterController,
  store: StoreController,
  i18n: TranslationController,

  development: DevelopmentController,
}
