export interface ProjectConfig {
  /** Full name of the project */
  name: string,

  /** Short name without spaces and dashes (-) */
  short_name: string,

  /** Project description */
  description?: string,

  /** API host to send request to */
  API_URL: string,

  /** Local storage key for saving auth token. Let it be something unique */
  LOCAL_STORAGE_KEY: string,
}
