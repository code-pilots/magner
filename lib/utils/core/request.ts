import type { RequestFunc, RequestWrapper } from '../../types/utils';
import api from '../api';
import globalValues from '../../global';

export const request: RequestFunc = (cb) => cb;

export const requestWrapper: RequestWrapper = (data, cb) => cb({
  data,
  api,
  store: globalValues.store,
  router: globalValues.router,
  errorParser: globalValues.store.state.project.development.errorParser,
  urlParsers: globalValues.store.state.project.development.urlParsers,
});
