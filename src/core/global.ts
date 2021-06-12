import type { Router } from 'vue-router';
import type { StoreType } from 'core/controllers/store/store';

export interface GlobalValues {
  router: Router,
  store: StoreType,
}

const globalValues = {} as GlobalValues;

export default globalValues;
