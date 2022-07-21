/**
 * An error class for handling API errors. Keeps the response
 * status and data for bug tracking.
 */
export class ApiError<DataType extends Record<any, any>> extends Error {
  name: string;
  status: number;
  data: DataType;

  constructor (params: { status: number, data: DataType }) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);

    // Maintains proper stack trace for where our error was thrown (only available on V8) Read more about it here:
    // https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript/67230709#67230709
    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, ApiError);
    }

    this.name = 'ApiError';
    this.status = params.status;
    this.data = params.data;
  }
}
