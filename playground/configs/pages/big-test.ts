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

  form: {
    debug: true,
    submit: {
      text: translate('form_test.submit_text'),
    },
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
