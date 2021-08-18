import { projectController } from 'core/controllers';
import urlParsers from 'configs/development/get-request';
import errorParser from 'configs/development/parse-error';
import manifest from 'configs/manifest';
import routing from 'configs/routing';
import store from 'configs/store';
import i18n from 'configs/translation';

export default projectController({
  manifest,
  routing,
  store,
  i18n,

  development: {
    noBackendMode: false,
    urlParsers,
    errorParser,
  },
});
