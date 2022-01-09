import { translate, filtersFormController } from 'magner';
import type { Address } from 'features/addresses/types';

const addressesFilters = filtersFormController<Address>({
  fieldsShowAmount: 1,

  saveToLocalStorage: true,

  actions: [
    {
      type: 'link',
      to: { name: 'address', params: { id: 'new' } },
      props: {
        type: 'primary',
        text: translate('address.filters.create_new'),
      },
    },
  ],

  submitEvent: 'input',

  pagination: {
    items: 100,
    page: 1,
  },

  filtersData: {},
  sort: {},

  layout: {
    type: 'row',
    props: {},
    layout: [],
  },
});

export default addressesFilters;
