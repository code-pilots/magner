import type { Router } from 'vue-router';
import type {
  ApiErrorType, ErrorParser, UrlToDataHelper, DataToUrlHelper,
} from 'lib/types/configs/development';
import type { ApiType } from 'lib/utils/api';
import type { LStorage } from 'lib/utils/core/local-storage';

/** A proxy that accepts anything and returns something different */
export type ProxyFunc<ARGUMENT = any, PROXY = any> = (data: ARGUMENT) => PROXY;

export type BaseResponse<RESULT = any> = { data: RESULT, error?: never } | { error: ApiErrorType, data?: never };

export type RequestWrap<RESULT = any, DATA = any> = (
  data: DATA) => Promise<BaseResponse<RESULT>>;

/** Request  function is used in different views. Users define it by themselves */
export type RequestCallback<RESULT = any, DATA = any> = (info: {
  data: DATA,
  api: ApiType,
  router: Router,
  lstorage: LStorage,
  parseError: ErrorParser<any>,
  urlToData?: UrlToDataHelper,
  dataToUrl?: DataToUrlHelper,
}) => Promise<BaseResponse<RESULT>>;

export type RequestFunc<RESULT = any, DATA = any> = (cb: RequestCallback<RESULT, DATA>) =>
  RequestWrap<RESULT, DATA>;

export type CardRequestFunc = <RESULT = any, DATA = any>(
  cb: RequestCallback<RESULT, { id: number|string, data: DATA }>
) => RequestWrap<RESULT, { id: number|string, data: DATA }>;
