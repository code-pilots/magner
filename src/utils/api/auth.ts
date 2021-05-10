import request from './helpers/api';
import parseErrors from './helpers/parse-errors';

interface LoginBody {
  username: string,
  email: string,
  password: string,
}

interface LoginResponse {
  key: string,
}

interface LoginResult {
  response?: LoginResponse,
  error?: string | Record<string, string> | null
}

interface SignupBody {
  username: string,
  email: string,
  password1: string,
  password2: string,
}

interface SignupResponse {
  key: string,
}

interface SignupResult {
  response?: SignupResponse,
  error?: string | Record<string, string> | null
}

interface User {
  pk: number,
  email: string,
}

/**
 * Functions for useful interactions with the back-end.
 * Define the endpoints for authorization and add returning types and catch possible errors.
 */
const authApi = {
  /**
   * Log In to the system with the following endpoint.
   * @param body – email and password for signing in
   * @return {key: string} – authorization token if successful.
   */
  login: async (body: LoginBody): Promise<LoginResult> => {
    try {
      const res = await request.post<LoginBody, LoginResponse>('rest-auth/login/', body);
      return { response: res };
    } catch (e) {
      if (e.status && e.data) {
        return { error: parseErrors(e.data) };
      }
      return { error: { non_field_errors: 'Sorry, a problem has occurred' } };
    }
  },

  /**
   * Sign Up to the system with the following endpoint.
   * @param body – email, password and password confirmation for signing up
   * @return {key: string} – authorization token if successful.
   */
  signup: async (body: SignupBody): Promise<SignupResult> => {
    try {
      const res = await request.post<SignupBody, SignupResponse>('rest-auth/registration/', body);
      return { response: res };
    } catch (e) {
      if (e.status && e.data) {
        return { error: parseErrors(e.data) };
      }
      return { error: { non_field_errors: 'Sorry, a problem has occurred' } };
    }
  },

  /**
   * Get the profile data (and also verify authorization) with this endpoint.
   * It is required to pass Authorization header into the request (handled by request.get method).
   * @returns – user profile data.
   */
  profile: async (): Promise<User|null> => {
    try {
      return await request.get<User>('api/auth/profile');
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};

export default authApi;
