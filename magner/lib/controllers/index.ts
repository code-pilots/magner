import type { ProjectController } from './project';
import { mainController } from './main';

export { projectController } from './project';
export { manifestController } from './manifest';
export { routerController } from './router';
export { translationController } from './i18n';

export {
  developmentController,
  validationController,
} from './development';

export {
  tablePageController,
  tableController,
  filtersFormController,
  formController,
  cardPageController,
  loginPageController,
} from './pages';

export const initMagner = (project: ProjectController) => {
  const proj = project();
  mainController(proj);
};
