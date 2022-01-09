import { cardPageController, InputField, translate } from 'magner';
import {
  bigtestCreate, bigtestGet, bigtestUpdate,
} from '../requests';
import CustomLayout from './custom-layout.vue';

const inputField: InputField<any> = {
  type: 'input',
  name: 'ex1',
  label: translate('layout_example.form.input.label'),
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

export default cardPageController<any>({
  header: {
    title: translate('layout_example.form.title'),
  },

  getRequest: bigtestGet,
  createRequest: bigtestCreate,
  updateRequest: bigtestUpdate,

  form: {
    actions: [{
      type: 'action',
      emits: 'submit',
      props: {
        type: 'primary',
        text: translate('layout_example.form.submit_button'),
      },
    }],
    layout: {
      type: 'row',
      props: {
        justify: 'space-between',
      },
      layout: [
        {
          type: 'custom',
          props: {
            title: translate('layout_example.form.layout.label'),
          },
          component: () => CustomLayout,
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
            justify: 'space-between',
          },
          layout: [
            {
              type: 'column',
              props: { span: 5, xs: 24 },
              fields: [inputField, inputField, inputField, inputField],
            },
            {
              type: 'column',
              title: translate('layout_example.form.layout.text'),
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
