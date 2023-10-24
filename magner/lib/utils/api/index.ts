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
  interceptError?: (e: { response?: Response, text?: string, name?: string }) => void,
}

type DataOrError<RESULT = any> = { data: RESULT, error?: never } | { error: ApiError<any> | Error, data?: never };

const resParse = async (response: any): Promise<DataOrError> => ({ data: response });

const resErrParse = async (
  e: { response?: Response, text?: string, name?: string },
  interceptor?: ApiControllerOptions['interceptError'],
): Promise<DataOrError> => {
  if (interceptor) {
    interceptor(e);
  }

  if (e?.response && e.text) {
    try {
      const data = await JSON.parse(e.text);
      return { error: new ApiError({ status: (e as any).response?.status ?? 500, data }) };
    } catch (_) {
      return { error: new Error(e.text) };
    }
  }
  return { error: new Error((e as Error).message) };
};

const handlePromiseChain = async <RESULT = any>(
  options: ApiControllerOptions,
  chain: ResponseChain,
): Promise<DataOrError<RESULT>> => chain.json(resParse).catch((e) => resErrParse(e, options.interceptError));

const createApi = (options: ApiControllerOptions) => {
  const baseApi = wretch(options.baseUrl || '', options.fetchOptions || {});

  const hcpGet = (chain: (path: string, config?: WretcherOptions) => ResponseChain) => <RESULT = any>(path: string, config: WretcherOptions = {}) => handlePromiseChain<RESULT>(options, chain(path, config));
  const hcpPost = (chain: (path: string, body: any, config?: WretcherOptions) => ResponseChain) => <RESULT = any>(path: string, body: any, config: WretcherOptions = {}) => handlePromiseChain<RESULT>(options, chain(path, body, config));

  return {
    instance: baseApi,

    get: hcpGet((path, config) => baseApi.url(path).get(config)),
    post: hcpPost((path, body, config) => baseApi.url(path).post(body, config)),
    put: hcpPost((path, body, config) => baseApi.url(path).put(body, config)),
    patch: hcpPost((path, body, config) => baseApi.url(path).patch(body, config)),
    delete: hcpGet((path, config) => baseApi.url(path).delete(config)),
    head: hcpGet((path, config) => baseApi.url(path).head(config)),
    opts: hcpGet((path, config) => baseApi.url(path).opts(config)),
  };
};

export const request = (options: ApiControllerOptions) => {
  const api = createApi(options);

  const requestCustom: RequestFunc = (cb) => async (data) => cb({
    api,
    urlToData: options.urlToData,
    dataToUrl: options.dataToUrl,
    parseError: options.parseError || ((e) => ({ message: e.name, fields: {} })),
    router: globalValues.router,
    lstorage: globalValues.lstorage,
    customStore: globalValues.customStore,
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
