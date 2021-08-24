/* eslint-disable no-restricted-syntax, no-loop-func, no-continue */
import { urlParsersController } from 'core/index';

const urlParsers = urlParsersController({
  dataToUrl: () => '',
  urlToData: () => ({}),
});

export default urlParsers;
