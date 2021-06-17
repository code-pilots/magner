import { tableController } from 'core/controllers';

const patientsTable = tableController({
  emptyText: 'Пациенты не найдены',
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
    },
    {
      prop: 'gender',
      label: 'Пол',
      width: 80,
    },
    {
      prop: 'email',
      label: 'Е-мейл',
      width: 200,
      sortable: true,
    },
    {
      prop: 'address',
      label: 'Адрес',
      width: 300,
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
