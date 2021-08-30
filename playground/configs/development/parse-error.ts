import { errorParserController } from 'lib/index';

const errorParser = errorParserController(() => ({
  fields: {},
  message: '',
}));

export default errorParser;
