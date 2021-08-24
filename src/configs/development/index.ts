import { developmentController } from 'core/index';
import urlParsers from 'configs/development/get-request';
import errorParser from 'configs/development/parse-error';
import profileRequest from 'configs/development/profile';
import validation from 'configs/development/validation';
import envs from '../../envs';

const development = developmentController({
  envs: {
    API_URL: envs.API_URL,
  },
  noBackendMode: true,

  urlParsers,
  errorParser,
  profileRequest,
  validation,
});

export default development;
