import usersRequest from 'app/requests/users';
import type { TableConfig } from 'settings/types/configs/table';

/**
 * Since Users extend the 'table' route preset, it must extend TableConfig.
 * Read more about table configuration in app/configs/table.ts
 */
const usersConfig: TableConfig = {
  title: 'Пользователи',
  request: usersRequest,
  dataField: 'users',
  submit: {
    text: 'Поиск',
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
      type: 'checkbox',
      name: 'isauth',
      validation: null,
      component: {},
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

export default usersConfig;
