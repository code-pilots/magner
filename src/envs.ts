const envs = {
  /** API host to send request to */
  API_URL: import.meta.env.VITE_APP_API_URL as string,

  /** Local storage key for saving auth token. Let it be something unique */
  LOCAL_STORAGE_KEY: import.meta.env.VITE_APP_LS_KEY as string,
};

export default envs;
