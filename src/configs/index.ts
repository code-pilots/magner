import { projectController } from 'core/controllers';
import manifest from 'configs/manifest';
import routing from 'configs/routing';
import store from 'configs/store';
import i18n from 'configs/translation';
import development from 'configs/development';

export default projectController({
  manifest,

  routing,
  store,
  i18n,

  development,
});
