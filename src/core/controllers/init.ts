import type { RouterController } from '../controllers/router';
import type { StoreController } from '../controllers/store';
import { mainController } from '../controllers/main';

export const initMagner = (router: RouterController, store: StoreController) => {
  mainController(router, store);
};
