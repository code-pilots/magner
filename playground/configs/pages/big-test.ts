import {
  translate, cardPageController,
} from 'lib/index';
import {
  bigtestCreate, bigtestDelete, bigtestGet, bigtestUpdate,
} from '../../app/requests/big-test';

export default cardPageController({
  title: translate('form_test.title'),

  getRequest: bigtestGet,
  createRequest: bigtestCreate,
  updateRequest: bigtestUpdate,
  deleteRequest: bigtestDelete,
  alwaysCreate: true,
  confirmDelete: true,

  tabs: [
    {
      label: 'Hey',
      active: true,
      link: '/',
    },
    {
      label: 'Lol',
      active: false,
      link: '/',
    },
  ],

  form: {
    debug: true,
    actions: [
      {
        action: 'cancel',
      },
      {
        action: 'submit',
        type: 'primary',
      },
      {
        action: 'remove',
        type: 'danger',
      },
      {
        action: 'clear',
      },
    ],
    layout: {
      type: 'row',
      props: {},
      fields: [
        {
          type: 'input',
          name: 'inp',
          label: 'Hello',
          props: {
            type: 'text',
            placeholder: 'Try validation',
          },
          validation: [
            {
              trigger: 'blur',
              type: 'empty',
            },
            {
              trigger: 'change',
              type: 'email',
            },
            {
              trigger: 'blur',
              type: 'email',
            },
          ],
        },
      ],
    },

    dialogForms: [],
  },
});
