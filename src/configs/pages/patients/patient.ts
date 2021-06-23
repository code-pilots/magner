import { patientCreate, patientGet } from 'app/requests/patient';
import { cardPageController } from 'core/controllers';
import patientForm from 'configs/pages/patients/form';

/**
 * Real-life example of extending the CardConfig route in case of the patient card
 */
export default cardPageController({
  title: 'Пациент',
  getRequest: patientGet,
  createRequest: patientCreate,
  form: patientForm,
});
