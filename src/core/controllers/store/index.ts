import {
  store, injectionKey, StoreType, InjectionKeyType,
} from './store';

export type StoreConfig = [StoreType, InjectionKeyType];
export type StoreController = () => StoreConfig;

export const storeController = (): StoreController => () => [store(), injectionKey];
