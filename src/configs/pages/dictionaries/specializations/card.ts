import { cardPageController } from 'core/controllers';
import specializationsForm from 'configs/pages/dictionaries/specializations/form';
import {
  specializationCreate,
  specializationGet,
  specializationUpdate,
} from 'app/requests/dictionaries/specialization';

export default cardPageController({
  title: 'Специализация',
  getRequest: specializationGet,
  createRequest: specializationCreate,
  updateRequest: specializationUpdate,

  confirmDelete: true,

  form: specializationsForm,
});
