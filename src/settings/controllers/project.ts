import { ProjectConfig } from 'settings/types/configs';
import { store } from 'settings/controllers/store/store';

export const projectController = (config: ProjectConfig) => {
  store.dispatch('changeProject', config);
  return true;
};
