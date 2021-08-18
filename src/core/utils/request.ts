import type { RequestFunc, RequestWrapper } from 'core/types/utils';
import api from 'core/utils/api';
import globalValues from 'core/global';

const request: RequestFunc = (cb) => cb;

export const requestWrapper: RequestWrapper = (data, cb) => cb({
  data,
  api,
  store: globalValues.store,
  router: globalValues.router,
  errorParser: globalValues.store.state.project.development.errorParser,
  urlParsers: globalValues.store.state.project.development.urlParsers,
});

export default request;
