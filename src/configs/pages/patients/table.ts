import { tableController } from 'core/controllers';

const patientsTable = tableController({
  emptyText: 'Пациенты не найдены',
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
      label: 'Полное имя',
      width: 300,
      sortable: true,
      showOverflowTooltip: true,
    },
    {
      prop: 'gender',
      label: 'Пол',
      width: 80,
    },
    {
      prop: 'email',
      label: 'Е-мейл',
      width: 250,
      sortable: true,
      showOverflowTooltip: true,
    },
    {
      prop: 'address',
      label: 'Адрес',
      width: 300,
      showOverflowTooltip: true,
    },
    {
      prop: 'apartment',
      label: 'Апартаменты',
      width: 150,
    },
    {
      prop: 'lat',
      label: 'Широта',
      width: 150,
    },
    {
      prop: 'long',
      label: 'Долгота',
      width: 150,
    },
  ],
});

export default patientsTable;
