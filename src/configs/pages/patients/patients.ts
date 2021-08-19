import patientsRequest from 'app/requests/patients';
import { tablePageController } from 'core/controllers';
import patientsFilters from 'configs/pages/patients/filters';
import patientsTable from 'configs/pages/patients/table';
import { translate } from 'core/utils';

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
