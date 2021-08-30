import type { ProjectController } from './project';
import { mainController } from './main';

export * from './main';
export * from './project';
export * from './manifest';
export * from './router';
export * from './i18n';
export * from './development';
export * from './components';

export const initMagner = (project: ProjectController) => {
  const proj = project();
  mainController(proj);
};
