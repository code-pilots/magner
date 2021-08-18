import globalValues from 'core/global';
import {
  store, injectionKey, StoreType, InjectionKeyType,
} from './store';

export type StoreController = () => [StoreType, InjectionKeyType];

export const storeController = (): StoreController => () => {
  globalValues.store = store;
  return [store, injectionKey];
};
