import type { Router } from 'vue-router';
import type { ApiError, ErrorParser, UrlParsers } from '../configs';
import type { ApiType } from '../../utils/api';
import type { LStorage } from '../../utils/core/local-storage';

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
  router: Router,
  errorParser: ErrorParser,
  urlParsers: UrlParsers,
  lstorage: LStorage,
}) => Promise<BaseResponse<RESULT>>;

export type RequestFunc = <RESULT = any, DATA = any>(cb: RequestCallback<RESULT, DATA>) =>
  RequestCallback<RESULT, DATA>;

export type RequestWrapper = <RESULT = any, DATA = any>(data: DATA, cb: RequestCallback<RESULT>) =>
  Promise<BaseResponse<RESULT>>;
