import { tableController, translate } from 'magner';
import type { Address } from 'features/addresses/types';

const addressesTable = tableController<Address>({
  emptyText: translate('address.table.not_found'),
  rowLink: (row) => ({ name: 'address', params: { id: row.id } }),
  columns: [
    {
      prop: 'id',
      label: translate('address.table.id'),
      width: 80,
    },
    {
      prop: 'name',
      label: translate('address.table.name'),
    },
    {
      prop: 'description',
      label: translate('address.table.description'),
    },
  ],
});

export default addressesTable;
