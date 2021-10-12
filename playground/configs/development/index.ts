import { developmentController } from 'lib/index';
import urlParsers from './get-request';
import errorParser from './parse-error';
import profileRequest from './profile';
import validation from './validation';
import envs from '../../envs';

const development = developmentController({
  envs: {
    API_URL: envs.API_URL,
  },
  noBackendMode: false,

  urlParsers,
  errorParser,
  profileRequest,
  validation,
});

export default development;
