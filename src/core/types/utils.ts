import type { Router } from 'vue-router';
import type { StoreType } from 'core/controllers/store/store';
import type { GlobalRouting } from 'core/types/configs';
import type { ApiError } from 'app/utils/parse-error';

/** A proxy that accepts anything and returns something different */
export type ProxyFunc<T = any, U = any> = (data: T) => U;

interface ErrorResponse {
  error: string | ApiError,
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
