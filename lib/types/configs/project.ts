import type {
  DevelopmentController,
  ManifestController,
  RouterController,
  TranslationController,
} from '../../controllers';
import type { SupportedAnalyzers } from '../../analyzers';

export interface ProjectConfig {
  /** Static analyzers import your project configuration not to run the app, but to use it for
   * retrieving useful information like full routes list or backend advises. Cannot be used it production mode. */
  analyze?: SupportedAnalyzers,

  manifest: ManifestController,
  routing: RouterController,
  i18n: TranslationController,

  development: DevelopmentController,
}
