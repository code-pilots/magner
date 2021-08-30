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

  confirmDelete: true,

  form: {
    debug: true,
    submit: {
      text: translate('form_test.submit_text'),
    },
    layout: {
      type: 'row',
      props: {
        justify: 'space-between',
        gutter: 12,
      },
      layout: [
        {
          type: 'row',
          props: {},
          fields: [
            {
              type: 'dropzone',
              name: 'photo',
              label: translate('form_test.form.dropzone_label'),
              props: {
                multiple: true,
              },
            },
          ],
        },
      ],
    },

    dialogForms: [],
  },
});
