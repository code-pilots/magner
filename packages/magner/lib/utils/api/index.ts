import type { WretcherOptions, ResponseChain } from 'wretch';
import wretch from 'wretch';

import type {
  DataToUrlHelper, ErrorParser, ProfileRequestFunc, UrlToDataHelper,
} from 'lib/types/configs/development';
import type { RequestFunc } from 'lib/types';
import type { CardRequestFunc } from 'lib/types/utils/api';
import type { TableRequestFunc } from 'lib/types/configs/pages/table';
import globalValues from 'lib/global';
import { ApiError } from 'lib/utils';

interface ApiControllerOptions {
  baseUrl?: string,
  fetchOptions?: WretcherOptions, // eslint-disable-line no-undef
  dataToUrl?: DataToUrlHelper,
  urlToData?: UrlToDataHelper,
  parseError?: ErrorParser<any>,
  headers?: Record<string, string>,
}

type DataOrError<RESULT = any> = { data: RESULT, error?: never } | { error: ApiError<any> | Error, data?: never };

const resParse = async (response: any): Promise<DataOrError> => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError({ status: response?.status ?? 500, data });
  }

  return { data };
};

const resErrParse = async (e: unknown): Promise<DataOrError> => {
  if (e instanceof ApiError) {
    return { error: e };
  }

  console.error(e);
  return { error: new Error((e as Error).message) };
};

const handlePromiseChain = <RESULT = any>(chain: ResponseChain & Promise<RESULT>) => {
  try {
    return chain.res().then(resParse).catch(resErrParse) as Promise<DataOrError<RESULT>>;
  } catch (e) {
    return resErrParse(e);
  }
};

const createApi = (options: ApiControllerOptions) => {
  const baseApi = wretch(options.baseUrl || '', options.fetchOptions || {});

  return {
    instance: baseApi,
    auth: (header: string) => baseApi.auth(header),

    get: <RESULT = any>(path: string, config: WretcherOptions = {}) => handlePromiseChain<RESULT>(baseApi
      .url(path).get(config)),
    post: <RESULT = any>(path: string, body: any, config: WretcherOptions = {}) => handlePromiseChain<RESULT>(baseApi
      .url(path).post(body, config)),
    put: <RESULT = any>(path: string, body: any, config: WretcherOptions = {}) => handlePromiseChain<RESULT>(baseApi
      .url(path, true).put(body, config)),
    patch: <RESULT = any>(path: string, body: any, config: WretcherOptions = {}) => handlePromiseChain<RESULT>(baseApi
      .url(path, true).patch(body, config)),
    delete: <RESULT = any>(path: string, config: WretcherOptions = {}) => handlePromiseChain<RESULT>(baseApi
      .url(path, true).delete(config)),
    head: <RESULT = any>(path: string, config: WretcherOptions = {}) => handlePromiseChain<RESULT>(baseApi
      .url(path, true).head(config)),
    opts: <RESULT = any>(path: string, config: WretcherOptions = {}) => handlePromiseChain<RESULT>(baseApi
      .url(path, true).opts(config)),
  };
};

export const request = (options: ApiControllerOptions) => {
  const api = createApi(options);

  const reqFuncData = {
    api,
    urlToData: options.urlToData,
    dataToUrl: options.dataToUrl,
    parseError: options.parseError || ((e) => ({ message: e.name, fields: {} })),
    router: globalValues.router,
    lstorage: globalValues.lstorage,
  };

  const requestCustom: RequestFunc = (cb) => async (data) => cb({
    ...reqFuncData,
    data,
  });

  const requestCard: CardRequestFunc = requestCustom;
  const requestTable: TableRequestFunc = requestCustom;
  const requestProfile: ProfileRequestFunc = requestCustom;

  return {
    api,
    custom: requestCustom,
    card: requestCard,
    table: requestTable,
    profile: requestProfile,
  };
};

export type ApiType = ReturnType<typeof createApi>;
export type Request = ReturnType<typeof request>;
