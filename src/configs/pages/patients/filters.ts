import { filtersFormController } from 'core/controllers';

const patientsFilters = filtersFormController({
  linkToCreateNew: {
    label: 'Создать',
    routeName: 'patient',
  },

  submit: null,
  submitEvent: 'input',

  pagination: {
    items: 100,
    page: 1,
  },

  filtersData: {
    patientId: 0,
    clinicId: 0,
    doctorId: 0,
    fullName: '',
  },

  sort: {},

  fields: [
    {
      type: 'input',
      name: 'fullName',
      validation: null,
      component: {
        type: 'text',
        placeholder: 'Полное имя',
        inputDelay: 400,
      },
    },
    // {
    //   type: 'select',
    //   name: 'sort',
    //   options: [
    //     {
    //       id: 1,
    //       slug: 'fullName',
    //       value: 'ASC',
    //       label: 'В алфавитном порядке по имени',
    //     },
    //     {
    //       id: 2,
    //       slug: 'fullName',
    //       value: 'DESC',
    //       label: 'В обратном алфавитном порядке по имени',
    //     },
    //     {
    //       id: 3,
    //       slug: 'receptionDate',
    //       value: 'DESC',
    //       label: 'Сначала ближайшие даты записи',
    //     },
    //     {
    //       id: 4,
    //       slug: 'receptionDate',
    //       value: 'ASC',
    //       label: 'Сначала старые даты записи',
    //     },
    //   ],
    //   validation: null,
    //   component: {
    //     placeholder: 'Сортировка',
    //     valueKey: 'id',
    //     clearable: true,
    //   },
    // },
  ],
});

export default patientsFilters;
