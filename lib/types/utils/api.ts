import type { Router } from 'vue-router';
import type { ApiError, ErrorParser, UrlParsers } from 'lib/types/configs/development';
import type { ApiType } from 'lib/utils/api';
import type { LStorage } from 'lib/utils/core/local-storage';

/** A proxy that accepts anything and returns something different */
export type ProxyFunc<ARGUMENT = any, PROXY = any> = (data: ARGUMENT) => PROXY;

interface ErrorResponse {
  error: string | ApiError,
  data?: never,
}

interface DataResponse<T = any> {
  error?: never,
  data: T,
}

export type BaseResponse<T = any> = ErrorResponse | DataResponse<T>;

/** Request  function is used in different views. Users define it by themselves */
export type RequestCallback<RESULT = any, DATA = any> = (info: {
  data: DATA,
  api: ApiType,
  router: Router,
  errorParser: ErrorParser<any>,
  urlParsers: UrlParsers,
  lstorage: LStorage,
}) => Promise<BaseResponse<RESULT>>;

export type RequestFunc = <RESULT = any, DATA = any>(cb: RequestCallback<RESULT, DATA>) =>
  RequestCallback<RESULT, DATA>;

export type CardRequestFunc = <RESULT = any, DATA = any>(
  cb: RequestCallback<RESULT, { id: number|string, data: DATA }>
) => RequestCallback<RESULT, { id: number|string, data: DATA }>;

export type RequestWrapper = <RESULT = any, DATA = any>(data: DATA, cb: RequestCallback<RESULT>) =>
  Promise<BaseResponse<RESULT>>;
