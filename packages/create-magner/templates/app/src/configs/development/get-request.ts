/* eslint-disable no-restricted-syntax, no-loop-func, no-continue */
import { urlParsersController } from 'magner';

const urlParsers = urlParsersController({
  /**
   * Function parses an object of form { items: 5, filters: { params: [1, 2] } } to the URL of type
   * ?items=5&filters[0][id]=params&filters[0][value]=1&filters[0][value]=2
   */
  dataToUrl: (data) => {
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
  },

  /**
   * Function parses an URL queries of form { items: "5", filters[0][id]="params", filters[0][value]=[1,2] }
   * made by Vue Router that parses the query string for us. If it sees equal keys, then makes an array of their values.
   * Returns the object of type { items: 5, filters: { params: [1, 2] } }
   */
  urlToData: (query = {}) => {
    const data: Record<string, any> = {};

    /** Vue-Router  */
    Object.entries(query).forEach(([key, value]) => {
      const matched = key.match(/^([^[]+)\[([0-9]+)]\[id]/);
      const isValue = new RegExp(/^[^[]+\[[0-9]+]\[value]/).test(key);
      if (!isValue) {
        if (matched) {
          if (!data[matched[1]]) data[matched[1]] = {};
          const paramValueSearch = `${matched[1]}[${matched[2]}][value]`;
          const paramValue = query[paramValueSearch];
          if (paramValue) {
            data[matched[1]][value] = paramValue;
          }
        } else {
          data[key] = value;
        }
      }
    });

    return data;
  },
});

export default urlParsers;
