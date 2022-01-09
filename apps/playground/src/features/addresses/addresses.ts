import { tablePageController, translate } from 'magner';
import { addressRead } from 'features/addresses/requests';
import addressesTable from 'features/addresses/table';
import addressesFilters from 'features/addresses/filters';
import { Address } from 'features/addresses/types';

const addressesConfig = tablePageController<Address>({
  header: {
    title: translate('address.table.title'),
  },
  request: addressRead,
  table: addressesTable,
  filters: addressesFilters,
});

export default addressesConfig;
