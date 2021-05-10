/**
 * A function for parsing errors coming from the backend.
 * Depending on the structure of the response, returns useful information
 * about the problem.
 *
 * @param data – response data
 * @return – object with field-related errors.
 */
const parseErrors = (data: Record<string, any>): Record<string, string>|null => {
  if (typeof data === 'object') {
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        if (data[key].length) {
          data[key] = data[key][0]; // eslint-disable-line prefer-destructuring
        } else {
          delete data[key];
        }
      }
    });
    return data;
  }
  return null;
};

export default parseErrors;
