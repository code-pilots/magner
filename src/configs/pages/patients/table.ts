import { tableController } from 'core/controllers';

const patientsTable = tableController({
  rows: [
    {
      prop: 'id',
      label: 'ID',
      width: 80,
    },
    {
      prop: 'fullName',
      label: 'Полное имя',
      width: 300,
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
      width: 100,
    },
    {
      prop: 'long',
      label: 'Долгота',
      width: 100,
    },
  ],
});

export default patientsTable;
