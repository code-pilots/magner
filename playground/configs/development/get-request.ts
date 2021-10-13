/* eslint-disable no-restricted-syntax, no-loop-func, no-continue */
import { urlParsersController } from 'lib/index';

const urlParsers = urlParsersController({
  dataToUrl: (data) => {
    const query: string[] = [];
    Object.entries(data).forEach((entry) => {
      if (entry[1] && typeof entry[1] !== 'object') {
        query.push(`${entry[0]}=${entry[1]}`);
      }
    });
    return `?${query.join('&')}`;
  },
  urlToData: () => ({}),
});

export default urlParsers;
