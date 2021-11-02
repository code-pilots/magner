import { filtersFormController } from 'lib/index';

const postsFilters = filtersFormController({
  fieldsShowAmount: 1,

  saveToLocalStorage: true,

  actions: [],
  submitEvent: 'input',

  filtersData: {},
  sort: {},
  pagination: {
    items: 100,
    page: 1,
  },

  layout: [],
});

export default postsFilters;
