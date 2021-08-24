import { errorParserController } from 'core/index';

const errorParser = errorParserController(() => ({
  fields: {},
  message: '',
}));

export default errorParser;
