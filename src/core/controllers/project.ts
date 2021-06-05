import { ProjectConfig } from '../types/configs';
import { store } from '../controllers/store/store';

export const projectController = (config: ProjectConfig) => {
  store.dispatch('changeProject', config);
  return true;
};
