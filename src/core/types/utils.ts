import type { Router } from 'vue-router';
import type { StoreType } from 'core/controllers/store/store';
import type { ApiError, ErrorParser, UrlParsers } from 'core/types/configs';
import type { ApiType } from 'core/utils/api';

/** A proxy that accepts anything and returns something different */
export type ProxyFunc<ARGUMENT = any, PROXY = any> = (data: ARGUMENT) => PROXY;

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
export type RequestCallback<RESULT = any, DATA = any> = (info: {
  data: DATA,
  api: ApiType,
  store: StoreType,
  router: Router,
  errorParser: ErrorParser,
  urlParsers: UrlParsers,
}) => Promise<BaseResponse<RESULT>>;

export type RequestFunc = <RESULT = any, DATA = any>(cb: RequestCallback<RESULT, DATA>) =>
  RequestCallback<RESULT, DATA>;

export type RequestWrapper = <RESULT = any, DATA = any>(data: DATA, cb: RequestCallback<RESULT>) =>
  Promise<BaseResponse<RESULT>>;
