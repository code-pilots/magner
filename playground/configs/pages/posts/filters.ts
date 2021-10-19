import { filtersFormController } from 'lib/index';

const postsFilters = filtersFormController({
  fieldsShowAmount: 1,

  saveToLocalStorage: true,

  actions: [],

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

  layout: [],
});

export default postsFilters;
