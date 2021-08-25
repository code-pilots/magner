import { translate, cardPageController } from 'core/index';
import {
  bigtestCreate, bigtestDelete, bigtestGet, bigtestUpdate,
} from 'app/requests/big-test';
import type { SelectField } from 'core/types/form/fields/select';
import { ButtonField } from 'core/types/form/fields/button';

const RadioOptions = [
  {
    value: 'all',
    label: translate('form_test.form.option_any'),
  },
  {
    value: 'adult',
    label: translate('form_test.form.option_adult'),
  },
  {
    value: 'child',
    label: translate('form_test.form.option_child'),
  },
];

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
