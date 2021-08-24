import { projectController } from 'core/controllers';
import manifest from 'configs/manifest';
import routing from 'configs/routing';
import i18n from 'configs/translation';
import development from 'configs/development';

export default projectController({
  manifest,
  routing,
  i18n,
  development,
});
