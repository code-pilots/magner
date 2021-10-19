/* eslint-disable no-undef */
import globalValues from 'lib/global';
import { ApiError } from './api-error';

interface RequestConfig extends RequestInit {
  isFormdata?: boolean
}

/**
 * A request wrapper method that handles authorization token passing, setting fetch
 * headers, catching errors and useful data passing into the request.
 * @param path – URL of the endpoint relative to the API host environmental constant
 * @param config – additional fetch configuration.
 */
export const http = async <T>(path: string, config: RequestConfig): Promise<T> => {
  if (!globalValues.development.envs.API_URL) {
    throw new Error('Please, set the API_URL in the "envs.ts" file! It is required for any API calls.');
  }

  const headers: HeadersInit = {};
  if (!config.isFormdata) headers['Content-Type'] = 'application/json';
  if (globalValues.store?.state?.token) headers.Authorization = `Bearer ${globalValues.store.state.token}`;
  headers['app-id'] = '61668bed20b7c65aee083fd0';

  try {
    const req = new Request(globalValues.development.envs.API_URL + path, {
      ...config,
      headers,
    });
    const response = await fetch(req);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError({ status: response?.status ?? 500, data });
    }

    return data;
  } catch (e: unknown) {
    if (e instanceof ApiError) {
      throw e;
    } else {
      console.error(e);
      throw new Error((e as Error).message);
    }
  }
};

/** Creates FormData object out of request's data if 'config.isFormdata' flag is passed */
const prepareBody = (body: any, config?: RequestConfig) => {
  if (!config?.isFormdata) {
    return JSON.stringify(body);
  }

  const data = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    const formValue = value instanceof Blob ? value : String(value);
    data.append(key, formValue);
  });

  return data;
};

/**
 * Several more useful functions for requests making depending on the
 * request method that you need.
 */
const api = {
  /** GET-request: no body needed. Use it to receive data from the backend */
  get: <T>(path: string, config?: RequestConfig): Promise<T> => {
    const init = { method: 'get', ...config };
    return http<T>(path, init);
  },

  /** POST-request: has optional body. Use it to create new entity instances */
  post: <T, U>(path: string, body: T, config?: RequestConfig): Promise<U> => {
    const init = { method: 'post', body: prepareBody(body, config), ...config };
    return http<U>(path, init);
  },

  /** PUT-request. Use it to update entity instances */
  put: <T, U>(path: string, body: T, config?: RequestConfig): Promise<U> => {
    const init = { method: 'put', body: prepareBody(body, config), ...config };
    return http<U>(path, init);
  },

  /** PATCH-request. Use it to update entity instances */
  patch: <T, U>(path: string, body: T, config?: RequestConfig): Promise<U> => {
    const init = { method: 'PATCH', body: prepareBody(body, config), ...config };
    return http<U>(path, init);
  },

  /** PUT-request. Use it to delete entities */
  delete: <T, U>(path: string, body?: T, config?: RequestConfig): Promise<U> => {
    const init = { method: 'delete', body: prepareBody(body, config), ...config };
    return http<U>(path, init);
  },
};

export type ApiType = typeof api;

export default api;
