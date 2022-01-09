import { cardPageController, translate } from 'magner';
import {
  addressGet, addressCreate, addressUpdate, addressDelete,
} from 'features/addresses/requests';
import type { Address } from 'features/addresses/types';

const addressConfig = cardPageController<Address>({
  header: {
    title: translate('address.form.title'),
  },

  getRequest: addressGet,
  createRequest: addressCreate,
  updateRequest: addressUpdate,
  deleteRequest: addressDelete,

  form: {
    actions: [
      {
        type: 'action',
        emits: 'submit',
        props: {
          text: translate('address.form.submit_button'),
          type: 'primary',
        },
      },
      {
        type: 'action',
        emits: 'remove',
        props: {
          text: translate('address.form.remove_button'),
          type: 'danger',
        },
      },
    ],

    layout: [
      {
        type: 'input',
        name: 'name',
        label: translate('address.form.name.label'),
        props: {
          placeholder: translate('address.form.name.placeholder'),
        },
      },
      {
        type: 'input',
        name: 'address',
        label: translate('address.form.address.label'),
        props: {
          placeholder: translate('address.form.address.placeholder'),
        },
      },
      {
        type: 'input',
        name: 'point',
        label: translate('address.form.point.label'),
        props: {
          placeholder: translate('address.form.point.placeholder'),
        },
      },
      {
        type: 'textarea',
        name: 'description',
        label: translate('address.form.description.label'),
        props: {
          rows: 3,
          placeholder: translate('address.form.description.placeholder'),
        },
      },
    ],
  },
});

export default addressConfig;
