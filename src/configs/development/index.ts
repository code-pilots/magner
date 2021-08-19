import { developmentController } from 'core/controllers';
import urlParsers from 'configs/development/get-request';
import errorParser from 'configs/development/parse-error';
import profileRequest from 'configs/development/profile';
import validation from 'configs/development/validation';

const development = developmentController({
  noBackendMode: false,
  urlParsers,
  errorParser,
  profileRequest,
  validation,
});

export default development;
