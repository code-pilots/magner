import type { StoreType } from '../controllers/store/store';
import type { Router } from 'vue-router';
import type { GlobalRouting } from '../types/configs';

/** A proxy that accepts anything and returns something different */
export type ProxyFunc<T = any, U = any> = (data: T) => U;

interface ErrorResponse {
  error: string,
  data: null,
}

interface DataResponse<T = any> {
  error: null,
  data: T,
}

export type BaseResponse<T = any> = ErrorResponse | DataResponse<T>;

/** Request  function is used in different views. Users define it by themselves */
export type RequestFunc<T = any> = (info: {
  data: any,
  store: StoreType,
  router?: Router,
  globalRoutes?: GlobalRouting,
}) => Promise<BaseResponse<T>>;
