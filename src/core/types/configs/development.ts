import type { ProxyFunc, RequestCallback } from 'core/types/utils';

type DataBody = Record<string, any>;
export type DataToUrlHelper = ProxyFunc<DataBody, string>;
export type UrlToDataHelper = ProxyFunc<DataBody, DataBody>;

export interface ApiError {
  fields: Record<string, string>,
  message: string,
}
export type ErrorParser = (err: any) => ApiError;

interface ProfileRequestResponse {
  role: string | null,
  token: string,
  user: any,
}
export type ProfileRequest = RequestCallback<ProfileRequestResponse>;

export interface UrlParsers {
  /** Proxy function from the request data to URL needed in GET requests */
  dataToUrl: DataToUrlHelper,
  /** Proxy function from the URL query to the data object, opposite to 'dataToUrl' function */
  urlToData: UrlToDataHelper,
}

export interface DevelopmentConfig {
  /** Used for creating the admin panel during first stages of development if you still don't have a backend.
   * It disables the roles feature and helps logging in.<br>
   * But it still requires request functions to be written which you can simple make empty (return void). */
  noBackendMode?: boolean,

  /** Functions that transform a key-value object to the URI string and vice versa */
  urlParsers: UrlParsers,

  /** Function that parses all errors caught while doing HTTP request to the server.
   * Return message string as global error or fields object to show error of some error field */
  errorParser: ErrorParser,

  /** Request to be used each time user enters the app to check for token validity and quickly authorize them */
  profileRequest: ProfileRequest,
}
