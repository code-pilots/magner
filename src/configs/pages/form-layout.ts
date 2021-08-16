import { cardPageController } from 'core/controllers';
import {
  bigtestCreate, bigtestGet, bigtestUpdate,
} from 'app/requests/big-test';
import translate from 'core/utils/translate';

export default cardPageController({
  title: translate('pages.form_layout'),
  getRequest: bigtestGet,
  createRequest: bigtestCreate,
  updateRequest: bigtestUpdate,

  form: {
    submit: {
      text: translate('form_test.submit_text'),
    },
    layout: {
      type: 'row',
      props: {
        justify: 'space-between',
      },
      layout: [
        {
          type: 'row',
          props: {},
          fields: [
            {
              type: 'input',
              name: 'ex1',
              label: translate('form_test.form.example_label'),
              props: {
                type: 'text',
                placeholder: '',
              },
            },
          ],
        },
      ],
    },
  },
});
