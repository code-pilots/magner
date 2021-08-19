import {
  patientCreate, patientDelete, patientGet, patientUpdate,
} from 'app/requests/patient';
import { cardPageController } from 'core/controllers';
import patientForm from 'configs/pages/patients/form';
import { translate } from 'core/utils';

/**
 * Real-life example of extending the CardConfig route in case of the patient card
 */
export default cardPageController({
  title: translate('patient.title'),
  getRequest: patientGet,
  createRequest: patientCreate,
  updateRequest: patientUpdate,
  deleteRequest: patientDelete,

  tabs: [
    {
      active: true,
      label: translate('patient.tabs.patient'),
      link: { name: 'patient', params: {} },
    },
    {
      label: translate('patient.tabs.specializations'),
      link: { name: 'specializations' },
    },
  ],

  confirmDelete: true,

  form: patientForm,
});
