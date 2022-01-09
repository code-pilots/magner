import constants from 'lib/utils/constants.cjs';

interface ENV {
  /** API host to send request to */
  API_URL: string,
}

// eslint-disable-next-line import/no-mutable-exports
let envs: ENV;
if (typeof module !== 'undefined') {
  envs = {
    API_URL: '',
  };
} else {
  envs = constants;
}

export default envs;
