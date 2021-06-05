/* eslint-disable no-restricted-syntax, no-loop-func, no-continue */
import type { ProxyFunc } from '../../core/types/utils';

type DataBody = Record<string, any>;
type GetUri = string;

const dataToUrl: ProxyFunc<DataBody, GetUri> = (data) => {
  const params = [];

  for (const [key, val] of Object.entries(data)) {
    if (!val) continue;

    /** If value is just a string or a number, return like items=15&page=1 */
    if (typeof val === 'string') {
      params.push(`${key}=${val}`);
    } else if (typeof val === 'number' || typeof val === 'boolean') {
      params.push(`${key}=${val.toString()}`);
    } else if (typeof val === 'object') {
      /**
       * In case of value as an object, make such a get-uri construction:
       * filters[0][id]=clinicId&filters[0][value]=15
       * */
      let index = 0;

      for (const [nestedKey, nestedVal] of Object.entries(val)) {
        if (!nestedVal) continue;

        params.push(`${key}[${index}][id]=${nestedKey}`);
        if (typeof nestedVal === 'string') {
          params.push(`${key}[${index}][value]=${nestedVal}`);
        } else if (typeof nestedVal === 'number' || typeof val === 'boolean') {
          params.push(`${key}[${index}][value]=${(nestedVal as number|boolean).toString()}`);
        } else if (Array.isArray(nestedVal)) {
          nestedVal.forEach((nestedValue) => {
            params.push(`${key}[${index}][value]=${nestedValue.toString()}`);
          });
        }
        index += 1;
      }
    }
  }

  return `?${params.join('&')}`;
};

export default dataToUrl;
