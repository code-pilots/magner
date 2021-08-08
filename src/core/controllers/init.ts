import type { RouterController } from './router';
import type { StoreController } from './store';
import type { TranslationController } from './i18n';
import { mainController } from './main';

export const initMagner = (router: RouterController, store: StoreController, i18n: TranslationController) => {
  mainController(router, store, i18n);
};
