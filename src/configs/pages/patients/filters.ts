import { filtersFormController } from 'core/controllers';
import translate from 'core/utils/translate';

const patientsFilters = filtersFormController({
  linkToCreateNew: {
    label: translate('patients.filters.create_new'),
    routeName: 'patient',
  },

  fieldsShowAmount: 1,

  saveToLocalStorage: true,

  submit: {
    type: 'primary',
    nativeType: 'submit',
    text: translate('patients.filters.submit'),
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

export default patientsFilters;
