import {
  store, injectionKey, StoreType, InjectionKeyType,
} from '../../controllers/store/store';

export type StoreController = [StoreType, InjectionKeyType];

export const storeController = (): StoreController => [store, injectionKey];
