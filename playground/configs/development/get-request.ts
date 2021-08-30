/* eslint-disable no-restricted-syntax, no-loop-func, no-continue */
import { urlParsersController } from 'lib/index';

const urlParsers = urlParsersController({
  dataToUrl: () => '',
  urlToData: () => ({}),
});

export default urlParsers;
