import {
  store, injectionKey, StoreType, InjectionKeyType,
} from 'core/controllers/store/store';

export type StoreController = [StoreType, InjectionKeyType];

export const storeController = (): StoreController => [store, injectionKey];
