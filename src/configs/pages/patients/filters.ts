import { filtersFormController } from 'core/controllers';

const patientsFilters = filtersFormController({
  linkToCreateNew: {
    label: 'Создать',
    routeName: 'patient',
  },

  fieldsShowAmount: 1,

  saveToLocalStorage: true,

  submit: {
    type: 'primary',
    nativeType: 'submit',
    text: 'Подтвердить',
  },
  submitEvent: 'input',

  pagination: {
    items: 100,
    page: 1,
  },

  filtersData: {
    fullName: '',
  },

  sort: {
    fullName: 'ASC',
  },

  fields: [
    {
      type: 'input',
      name: 'fullName',
      column: 1,
      component: {
        type: 'text',
        placeholder: 'Полное имя',
        inputDelay: 400,
      },
    },
    {
      type: 'select',
      name: 'sort',
      column: 2,
      component: {
        placeholder: 'Пример селекта',
        valueKey: 'id',
        clearable: true,
      },
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
      ],
    },
  ],
});

export default patientsFilters;
