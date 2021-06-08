export interface ApiError {
  fields: Record<string, string>,
  message: string,
}

/**
 * Parse an error from the ApiError class defined in core/utils/api/api-error.ts
 */
const parseError = (err: any): ApiError => ({
  fields: err?.data?.errors?.fields || {},
  message: err?.data?.message || '',
});

export default parseError;
