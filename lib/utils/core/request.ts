import type { CardRequestFunc, RequestFunc, RequestWrapper } from 'lib/types/utils/api';
import type { TableRequest } from 'lib/types/configs/pages/table';
import globalValues from 'lib/global';

import api from '../api';

export const request: RequestFunc = (cb) => cb;

export const requestCard: CardRequestFunc = (cb) => cb;

export const requestTable: TableRequest = (cb) => cb;

export const requestWrapper: RequestWrapper = (data, cb) => cb({
  data,
  api,
  router: globalValues.router,
  errorParser: globalValues.store.state.project.development.errorParser,
  urlParsers: globalValues.store.state.project.development.urlParsers,
  lstorage: globalValues.lstorage,
});
