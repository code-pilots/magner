import type { SupportedDataTypes } from 'lib/utils/form/form';
import type { ApiError } from 'lib/utils/api/api-error';
import type { TranslateData } from 'lib/utils/core/translate';
import type { ProxyFunc, RequestWrap, RequestCallback } from '../utils/api';

type DataBody = Record<string, any>;

/** Proxy function from the request data to URL needed in GET requests */
export type DataToUrlHelper = ProxyFunc<DataBody, string>;

/** Proxy function from the URL query to the data object, opposite to 'dataToUrl' function */
export type UrlToDataHelper = ProxyFunc<DataBody, DataBody>;

export interface ApiErrorType {
  fields: Record<string, string>,
  message: TranslateData,
}

export type ErrorParser<ERR = Record<string, unknown>> = (err: ApiError<ERR> | Error) => ApiErrorType;

export interface ProfileRequestResponse {
  role: string | null,
  user: unknown,
}
export type ProfileRequestFunc = <DATA = any>(cb: RequestCallback<ProfileRequestResponse, DATA>) =>
  RequestWrap<ProfileRequestResponse, DATA>;

export type SupportedValidators = 'password'|'email'|'phone'|'empty';

export type ValidatorWrapper = (
  data: {
    rule: SupportedValidators,
    value: any,
    form: Record<string, any>,
  },
  callback: Function,
) => void;

export type ValidatorFunc = (
  rule: SupportedValidators,
  value: any,
  callback: Function,
) => ReturnType<ValidatorWrapper>;

export interface ValidationField {
  type: SupportedDataTypes,
  validator: ValidatorFunc,
  trigger: 'blur'|'change',
}

export type Validators<CUSTOM_VALIDATION extends string>
  = Record<CUSTOM_VALIDATION, ValidatorWrapper>;

export interface DevelopmentConfig {
  /** Constants that should be hidden */
  envs: {
    /** Base URL of any backend endpoints */
    API_URL: string,
  },

  /**
   * Used for creating the admin panel during first stages of development if you still don't have a backend.
   * It disables the roles feature and helps logging in.<br>
   * But it still requires request functions to be written which you can simple make empty (return void).
   */
  noBackendMode?: boolean,

  /** Request to be used each time user enters the app to check for token validity and quickly authorize them */
  profileRequest: RequestWrap<ProfileRequestResponse>,

  /** Request that clears user session */
  logoutRequest: RequestWrap<null>,

  validation: Validators<string>,
}
