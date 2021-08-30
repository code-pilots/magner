import { projectController } from 'lib/index';
import manifest from './manifest';
import routing from './routing';
import i18n from './translation';
import development from './development';

export default projectController({
  manifest,
  routing,
  i18n,
  development,
});
