import globalValues from 'core/global';
import { ProjectConfig } from '../types/configs';

export const projectController = (config: ProjectConfig) => {
  globalValues.store.dispatch('changeProject', config);
  return true;
};
