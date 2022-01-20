import { request as magnerRequest } from 'magner';
import { API_URL } from '~/constants';

export const request = magnerRequest({
  baseUrl: API_URL,

  parseError: (err) => ({
    message: '',
    fields: {},
  }),

  dataToUrl: (data) => JSON.stringify(data),
  urlToData: (query = {}) => query,
});
