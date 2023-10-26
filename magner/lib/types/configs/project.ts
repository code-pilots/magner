import type { DevelopmentController } from 'lib/controllers/development';
import type { ManifestController } from 'lib/controllers/manifest';
import type { RouterController } from 'lib/controllers/router';
import type { TranslationController } from 'lib/controllers/i18n';
import type { AppStoreType } from 'lib/types';

export interface ProjectConfig {
  manifest: ManifestController,
  routing: RouterController,
  i18n: TranslationController,
  development: DevelopmentController,

  appStore?: AppStoreType,
}
