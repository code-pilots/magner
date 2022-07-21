export const API_URL = import.meta.env.VITE_APP_API_URL as string;
export const ENVIRONMENT = import.meta.env.VITE_APP_ENVIRONMENT as 'demo' | 'staging' | 'prod';

// eslint-disable-next-line no-shadow
export enum ROLE {
  ADMIN = 'ROLE_ADMIN'
}
