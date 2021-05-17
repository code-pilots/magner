/* eslint-disable no-undef */
import projectConfig from 'configs/project';
import { store } from 'settings/controllers/store';
import ApiError from './api-error';

/**
 * A request wrapper method that handles authorization token passing, setting fetch
 * headers, catching errors and useful data passing into the request.
 * @param path – URL of the endpoint relative to the API host environmental constant
 * @param config – additional fetch configuration.
 */
export const http = async <T>(path: string, config: RequestInit): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (store?.state?.token) headers.Authorization = `Token ${store.state.token}`;

  try {
    const req = new Request(projectConfig.API_URL + path, {
      ...config,
      headers,
    });
    const response = await fetch(req);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError({ status: response?.status || 500, data });
    }

    return data;
  } catch (e) {
    if (e instanceof ApiError) {
      throw e;
    } else {
      console.error(e);
      throw new Error(e.message);
    }
  }
};

/**
 * Several more useful functions for requests making depending on the
 * request method that you need.
 */
const request = {
  /** GET-request: no body needed. Use it to receive data from the backend */
  get: <T>(path: string, config?: RequestInit): Promise<T> => {
    const init = { method: 'get', ...config };
    return http<T>(path, init);
  },

  /** POST-request: has optional body. Use it to create new entity instances */
  post: <T, U>(path: string, body: T, config?: RequestInit): Promise<U> => {
    const init = { method: 'post', body: JSON.stringify(body), ...config };
    return http<U>(path, init);
  },

  /** PUT-request. Use it to update entity instances */
  put: <T, U>(path: string, body: T, config?: RequestInit): Promise<U> => {
    const init = { method: 'put', body: JSON.stringify(body), ...config };
    return http<U>(path, init);
  },

  /** PATCH-request. Use it to update entity instances */
  patch: <T, U>(path: string, body: T, config?: RequestInit): Promise<U> => {
    const init = { method: 'PATCH', body: JSON.stringify(body), ...config };
    return http<U>(path, init);
  },

  /** PUT-request. Use it to delete entities */
  delete: <T, U>(path: string, body: T, config?: RequestInit): Promise<U> => {
    const init = { method: 'delete', body: JSON.stringify(body), ...config };
    return http<U>(path, init);
  },
};

export default request;
