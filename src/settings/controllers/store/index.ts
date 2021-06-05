import {
  store, injectionKey, StoreType, InjectionKeyType,
} from 'settings/controllers/store/store';

export type StoreController = [StoreType, InjectionKeyType];

export const storeController = (): StoreController => [store, injectionKey];
