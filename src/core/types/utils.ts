import type { Router } from 'vue-router';
import type { StoreType } from 'core/controllers/store/store';
import type { ApiError } from 'app/utils/parse-error';
import type { ApiType } from 'core/utils/api';

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
export type RequestCallback<T = any> = (info: {
  data: any,
  api: ApiType,
  store: StoreType,
  router: Router,
}) => Promise<BaseResponse<T>>;

export type RequestFunc = <T = any>(cb: RequestCallback<T>) => RequestCallback<T>;

export type RequestWrapper = <T = any>(data: any, cb: RequestCallback<T>) => Promise<BaseResponse<T>>;
