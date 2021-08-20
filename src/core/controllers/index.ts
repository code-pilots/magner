import type { ProjectController } from 'core/controllers/project';
import { mainController } from 'core/controllers/main';

export * from './main';
export * from './project';
export * from './manifest/index';
export * from './router';
export * from './i18n';
export * from './development/index';
export * from './components';

export const initMagner = (project: ProjectController) => {
  const proj = project();
  mainController(proj);
};
