import type { DevelopmentController } from 'lib/controllers/development';
import type { ManifestController } from 'lib/controllers/manifest';
import type { RouterController } from 'lib/controllers/router';
import type { TranslationController } from 'lib/controllers/i18n';
import type { SupportedAnalyzers } from 'lib/analyzers';

export interface ProjectConfig {
  /** Static analyzers import your project configuration not to run the app, but to use it for
   * retrieving useful information like full routes list or backend advises. Cannot be used it production mode. */
  analyze?: SupportedAnalyzers,

  manifest: ManifestController,
  routing: RouterController,
  i18n: TranslationController,

  development: DevelopmentController,
}
