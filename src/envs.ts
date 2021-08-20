import constants from 'core/utils/constants.cjs';

interface ENV {
  /** API host to send request to */
  API_URL: string,

  /** Local storage key for saving auth token. Let it be something unique */
  LOCAL_STORAGE_KEY: string,
}

// eslint-disable-next-line import/no-mutable-exports
let envs: ENV;
if (typeof module !== 'undefined') {
  envs = {
    API_URL: '',
    LOCAL_STORAGE_KEY: 'SOMEKEY',
  };
} else {
  envs = constants;
}

export default envs;
