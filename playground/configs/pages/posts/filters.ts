import { translate, filtersFormController } from 'lib/index';

const postsFilters = filtersFormController({
  fieldsShowAmount: 1,

  saveToLocalStorage: true,

  actions: [
    {
      action: 'submit',
      type: 'primary',
      text: translate('patients.filters.submit'),
    },
  ],

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

  layout: {
    type: 'row',
    props: {},
    layout: [
      {
        type: 'column',
        props: {},
        fields: [
          {
            type: 'input',
            name: 'fullName',
            props: {
              type: 'text',
              placeholder: translate('patients.filters.fullname_placeholder'),
              inputDelay: 400,
            },
          },
        ],
      },
      {
        type: 'column',
        props: {},
        fields: [
          {
            type: 'select',
            name: 'sort',
            props: {
              placeholder: translate('patients.filters.sort_placeholder'),
              valueKey: 'id',
              clearable: true,
            },
            options: [
              {
                id: 1,
                slug: 'fullName',
                value: 'ASC',
                label: translate('patients.filters.sort_alphabetical'),
              },
              {
                id: 2,
                slug: 'fullName',
                value: 'DESC',
                label: translate('patients.filters.sort_alphabetical_reverse'),
              },
            ],
          },
        ],
      },
    ],
  },
});

export default postsFilters;
