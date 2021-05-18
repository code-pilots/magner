import type { StoreType } from 'settings/controllers/store';
import type { Router } from 'vue-router';

/** A proxy that accepts anything and returns something different */
export type ProxyFunc<T = any, U = any> = (data: T) => U;

/** Request  function is used in different views. Users define it by themselves */
export type RequestFunc = (info: {
  url: string,
  data: any,
  store: StoreType,
  router?: Router,
}) => Promise<string|null>;
