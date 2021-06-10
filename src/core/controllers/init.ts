import type { RouterController } from './router';
import type { StoreController } from './store';
import { mainController } from './main';

export const initMagner = (router: RouterController, store: StoreController) => {
  mainController(router, store);
};
