import { cardPageController, InputField } from 'core/index';
import {
  bigtestCreate, bigtestGet, bigtestUpdate,
} from 'app/requests/big-test';
import { translate } from 'core/utils';
import CustomLayout from 'app/components/custom-layout.vue';

const inputField: InputField = {
  type: 'input',
  name: 'ex1',
  label: translate('form_test.form.example_label'),
  props: {
    type: 'text',
    placeholder: '',
  },
};

const bigCol: any = {
  type: 'column',
  props: { span: 12, xs: 24 },
  fields: [inputField],
};

const mdCol: any = {
  type: 'column',
  props: { span: 6, xs: 24 },
  fields: [inputField],
};

const smallCol: any = {
  type: 'column',
  props: { span: 3, xs: 24 },
  fields: [inputField],
};

const smallestCol: any = {
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
          type: 'custom',
          props: {
            title: translate('form_test.form.custom_layout'),
          },
          component: CustomLayout,
        },

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
      ],
    },
  },
});
