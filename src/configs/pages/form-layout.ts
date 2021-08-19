import { cardPageController } from 'core/controllers';
import {
  bigtestCreate, bigtestGet, bigtestUpdate,
} from 'app/requests/big-test';
import { translate } from 'core/utils';
import type { InputField } from 'core/types/form/fields/input';
import type { ColumnFields } from 'core/types/form/layout';

const inputField: InputField = {
  type: 'input',
  name: 'ex1',
  label: translate('form_test.form.example_label'),
  props: {
    type: 'text',
    placeholder: '',
  },
};

const bigCol: ColumnFields = {
  type: 'column',
  props: { span: 12, xs: 24 },
  fields: [inputField],
};

const mdCol: ColumnFields = {
  type: 'column',
  props: { span: 6, xs: 24 },
  fields: [inputField],
};

const smallCol: ColumnFields = {
  type: 'column',
  props: { span: 3, xs: 24 },
  fields: [inputField],
};

const smallestCol: ColumnFields = {
  type: 'column',
  props: { span: 2, xs: 24 },
  fields: [inputField],
};

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
          type: 'column',
          props: { span: 24 },
          fields: [inputField],
        },

        {
          type: 'row',
          props: { gutter: 12 },
          layout: [
            bigCol,
            bigCol,
          ],
        },

        {
          type: 'row',
          props: {
            gutter: 12,
          },
          layout: [
            mdCol,
            mdCol,
            mdCol,
            mdCol,
          ],
        },

        {
          type: 'row',
          props: {
            gutter: 12,
          },
          layout: [
            smallCol,
            smallCol,
            smallCol,
            smallCol,
            smallCol,
            smallCol,
            smallCol,
            smallCol,
          ],
        },

        {
          type: 'row',
          props: {
            gutter: 12,
          },
          layout: [
            smallestCol,
            smallestCol,
            smallestCol,
            smallestCol,
            smallestCol,
            smallestCol,
            smallestCol,
            smallestCol,
            smallestCol,
            smallestCol,
            smallestCol,
            smallestCol,
          ],
        },

        {
          type: 'row',
          props: {
            justify: 'space-around',
          },
          layout: [
            {
              type: 'column',
              props: { span: 5, xs: 24 },
              fields: [inputField, inputField, inputField, inputField],
            },
            {
              type: 'column',
              title: translate('form_test.form.layout_text'),
              props: {
                span: 12,
                xs: 24,
                isPaper: true,
                titleType: 'heading',
              },
              layout: [
                {
                  type: 'row',
                  props: {},
                  fields: [inputField],
                },
                {
                  type: 'row',
                  props: { justify: 'space-between' },
                  layout: [
                    bigCol,
                    mdCol,
                    smallCol,
                  ],
                },
                {
                  type: 'column',
                  props: { span: 24 },
                  fields: [inputField],
                },
              ],
            },
            {
              type: 'column',
              props: { span: 5, xs: 24 },
              fields: [inputField, inputField, inputField, inputField],
            },
          ],
        },

        {
          type: 'column',
          props: { span: 24 },
          fields: [inputField],
        },
      ],
    },
  },
});
