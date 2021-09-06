import type { RequestFunc, RequestWrapper } from '../../types/utils/api';
import type { TableRequest } from '../../types/configs/pages/table';

import api from '../api';
import globalValues from '../../global';

export const request: RequestFunc = (cb) => cb;

export const requestWrapper: RequestWrapper = (data, cb) => cb({
  data,
  api,
  router: globalValues.router,
  errorParser: globalValues.store.state.project.development.errorParser,
  urlParsers: globalValues.store.state.project.development.urlParsers,
  lstorage: globalValues.lstorage,
});

export const tableRequest: TableRequest = (cb) => cb;
