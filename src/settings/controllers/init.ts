import type { RouterController } from 'settings/controllers/router';
import type { StoreController } from 'settings/controllers/store';
import { mainController } from 'settings/controllers/main';

export const initMagner = (router: RouterController, store: StoreController) => {
  mainController(router, store);
};
