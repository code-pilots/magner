/**
 * An error class for handling API errors. Keeps the response
 * status and data for bug tracking.
 */
export default class ApiError extends Error {
  name: string;
  status: number;
  data: Record<string, any>;

  constructor (params: { status: number, data: Record<string, any> }) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, ApiError);
    }

    this.name = 'ApiError';
    this.status = params.status;
    this.data = params.data;
  }
}
