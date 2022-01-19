import { developmentController } from 'magner';
import profileRequest from 'configs/development/profile';
import validation from 'configs/development/validation';
import { API_URL } from '~/constants';

const development = developmentController({
  envs: {
    API_URL,
  },
  noBackendMode: true,
  profileRequest,
  validation,
});

export default development;
