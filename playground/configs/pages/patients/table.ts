import { tableController, translate } from 'lib/index';

const patientsTable = tableController({
  emptyText: translate('patients.table.not_found'),
  rowLink: (row) => ({ name: 'patient', params: { id: row.id } }),
  columns: [
    {
      prop: 'id',
      label: 'ID',
      width: 80,
      fixed: 'left',
    },
    {
      prop: 'fullName',
      label: translate('patients.table.fullname'),
      width: 300,
      sortable: true,
      showOverflowTooltip: true,
    },
    {
      prop: 'gender',
      label: translate('patients.table.gender'),
      width: 80,
    },
    {
      prop: 'email',
      label: translate('patients.table.email'),
      width: 250,
      sortable: true,
      showOverflowTooltip: true,
    },
    {
      prop: 'address',
      label: translate('patients.table.address'),
      width: 300,
      showOverflowTooltip: true,
    },
    {
      prop: 'apartment',
      label: translate('patients.table.apartments'),
      width: 150,
    },
    {
      prop: 'lat',
      label: translate('patients.table.latitude'),
      width: 150,
    },
    {
      prop: 'long',
      label: translate('patients.table.longitude'),
      width: 150,
    },
  ],
});

export default patientsTable;
