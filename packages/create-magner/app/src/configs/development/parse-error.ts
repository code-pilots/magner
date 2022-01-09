import { errorParserController } from 'magner';

/** Parse an error from the server request to field errors or a global error message */
const errorParser = errorParserController((err) => ({
  fields: err?.data?.errors?.fields || {},
  message: err?.data?.message || '',
}));

export default errorParser;
