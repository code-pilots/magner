import patientsRequest from 'app/requests/patients';
import type { TableConfig } from '../../core/types/configs/table';

/**
 * Since Patients extend the 'table' route preset, it must extend TableConfig.
 * Read more about table configuration in app/configs/table.ts
 */
const patientsConfig: TableConfig = {
  title: 'Пациенты',

  request: patientsRequest,
  dataField: 'users',

  submit: {
    text: 'Поиск',
  },
  linkToCreateNew: {
    label: 'Создать',
    routeName: 'patient',
  },

  filters: [
    {
      type: 'input',
      name: 'fullName',
      validation: null,
      component: {
        type: 'text',
        placeholder: 'Полное имя',
      },
    },
    {
      type: 'select',
      name: 'sort',
      options: [
        {
          id: 1,
          slug: 'fullName',
          value: 'ASC',
          label: 'В алфавитном порядке по имени',
        },
        {
          id: 2,
          slug: 'fullName',
          value: 'DESC',
          label: 'В обратном алфавитном порядке по имени',
        },
        {
          id: 3,
          slug: 'receptionDate',
          value: 'DESC',
          label: 'Сначала ближайшие даты записи',
        },
        {
          id: 4,
          slug: 'receptionDate',
          value: 'ASC',
          label: 'Сначала старые даты записи',
        },
      ],
      validation: null,
      component: {
        placeholder: 'Сортировка',
        valueKey: 'id',
        clearable: true,
      },
    },
  ],

  table: [
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
};

export default patientsConfig;
