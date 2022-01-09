import { errorParserController } from 'lib/index';

interface BackendError {
  result: {
    errors?: {
      fields: Record<string, string>,
    },
    message?: string,
  }
}

const errorParser = errorParserController<BackendError>((err) => ({
  fields: err?.data?.result?.errors?.fields || {},
  message: err?.data?.result?.message || '',
}));

export default errorParser;
