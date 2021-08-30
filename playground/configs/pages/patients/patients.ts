import { tablePageController, translate } from 'lib/index';
import patientsRequest from '../../../app/requests/patients';
import patientsFilters from '../patients/filters';
import patientsTable from '../patients/table';

/**
 * Since Patients extend the 'table' route preset, it must extend TableConfig.
 * Read more about table configuration in app/configs/table.ts
 */
export default tablePageController({
  title: translate('pages.patients'),
  request: patientsRequest,
  filters: patientsFilters,
  table: patientsTable,
});
