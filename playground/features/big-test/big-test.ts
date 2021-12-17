import {
  translate, cardPageController, request, SelectField, action,
} from 'lib/index';
import {
  bigtestCreate, bigtestDelete, bigtestGet, bigtestUpdate,
} from './requests';

interface Pet {
  id: number,
  name: string,
}

const getList = request<Pet[]>(async ({ api }) => {
  const res = await api.get<Pet[]>('/pet/findByStatus?status=pending');
  return { data: res || [] };
});

const RadioOptions = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'adult',
    label: 'Adult',
  },
  {
    value: 'child',
    label: 'Child',
  },
];

interface BigTestEntity {
  email: string,
  phone: string,
  textarea: string,
  parentCategory: string,
  country: string,
  radio: string,
  checkbox: boolean,
  checkboxActive: boolean,
  isactive: boolean,
  datetime1: string,
  datetime7: string,
  photo: string,
  editor1: string,
  people: {firstname: string, lastname: string}[],
}

export default cardPageController<BigTestEntity>({
  header: {
    title: translate('form_test.title'),

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
  },

  getRequest: bigtestGet,
  createRequest: bigtestCreate,
  updateRequest: bigtestUpdate,
  deleteRequest: bigtestDelete,
  alwaysCreate: false,
  confirmDelete: true,

  form: {
    debug: true,
    actions: [
      {
        type: 'action',
        action: action(async () => {}),
        emits: 'cancel',
        props: {
          text: translate('post.cancel'),
        },
      },
      {
        type: 'action',
        action: action(async () => {}),
        emits: 'submit',
        props: {
          type: 'primary',
          text: translate('post.submit'),
        },
      },
      {
        type: 'action',
        action: action(async () => {}),
        emits: 'remove',
        props: {
          type: 'danger',
          text: translate('post.remove'),
        },
      },
      {
        type: 'action',
        action: action(async () => {}),
        emits: 'clear',
        props: {
          text: translate('post.clear'),
        },
      },
    ],

    layout: {
      type: 'row',
      props: {
        justify: 'space-between',
      },
      layout: [
        /** Text fields */
        {
          type: 'column',
          props: {
            span: 12,
            xs: 24,
            styles: { 'padding-right': '12px' },
          },
          fields: [
            {
              type: 'input',
              name: 'email',
              label: 'Email',
              validation: {
                type: 'email',
                trigger: 'blur',
              },
              props: {
                required: true,
                type: 'email',
                placeholder: 'example@domain.com',
              },
            },

            {
              type: 'input',
              name: 'phone',
              label: 'Phone',
              hint: 'Edit the email field to make this field readOnly',
              validation: {
                type: 'phone',
                trigger: 'blur',
              },
              props: {
                readOnly: ({ state }) => !!state.email,
                readOnlyFormatter: (val) => `+${val}`,
                type: 'tel',
                placeholder: '+7-915-820-14-02',
                mask: {
                  mask: '+7-###-###-##-##',
                },
              },
            },

            {
              type: 'textarea',
              name: 'textarea',
              label: 'Textarea',
              hint: 'Edit the \'phone\' field to access this textarea',
              props: {
                placeholder: 'Text',
                autosize: { minRows: 3, maxRows: 5 },
                maxLength: 1024,
                showLetterLimit: true,
              },
              validation: {
                type: 'empty',
                trigger: 'blur',
              },
            },
          ],
        },

        /** Selects */
        {
          type: 'column',
          props: {
            span: 12,
            xs: 24,
          },
          fields: [
            {
              type: 'select',
              name: 'parentCategory',
              label: 'Родительская категория',
              options: [],
              props: {
                remote: true,
                remoteMethod: getList,
                valueKey: 'id',
                labelKey: 'name',
                clearable: true,
              },
            },

            {
              type: 'select',
              name: 'country',
              label: 'Country',
              options: [
                {
                  value: 'rus',
                  label: 'Russia',
                },
                {
                  value: 'norus',
                  label: 'Not russia',
                },
              ],
              changeAction: ({ getField }) => {
                const parentCategoryField = getField<SelectField<BigTestEntity>>('parentCategory');
                if (parentCategoryField) {
                  parentCategoryField.options = [{
                    id: 2,
                    name: 'Hello',
                  }];
                }
              },
              props: {
                placeholder: 'Russia',
                clearable: true,
                readOnly: true,
              },
            },
          ],
        },

        /** Radio buttons, checkboxes, switches */
        {
          type: 'row',
          props: {
            justify: 'space-between',
          },
          layout: [
            {
              type: 'column',
              title: 'Radio buttons',
              props: {
                titleType: 'heading',
                isPaper: true,
                span: 11,
                xs: 24,
              },
              fields: [
                {
                  type: 'radio',
                  name: 'radio',
                  label: 'Your age?',
                  props: {},
                  options: RadioOptions,
                },
              ],
            },
            {
              type: 'column',
              title: 'Checkboxes',
              props: {
                titleType: 'heading',
                isPaper: true,
                span: 12,
                xs: 24,
              },
              fields: [
                {
                  type: 'checkbox',
                  name: 'checkboxActive',
                  dataType: 'array',
                  label: 'Who is allowed?',
                  props: {},
                  options: RadioOptions,
                },
                {
                  type: 'checkbox',
                  name: 'checkbox',
                  dataType: 'array',
                  label: 'Who is allowed?',
                  props: {
                    readOnly: true,
                    readOnlyFormatter: (val) => (val as string[]).join(' and '),
                  },
                  options: RadioOptions,
                },
                {
                  type: 'switch',
                  dataType: 'boolean',
                  name: 'isactive',
                  label: 'Switch',
                  props: {
                    inactiveLabel: 'Inactive',
                  },
                },
              ],
            },
          ],
        },

        /** Dates */
        {
          type: 'row',
          title: 'Date Range Pickers',
          props: {
            titleType: 'heading',
            isPaper: true,
          },
          layout: [
            {
              type: 'row',
              props: {
                justify: 'space-around',
              },
              fields: [
                {
                  type: 'datetime',
                  name: 'datetime1',
                  dataType: 'date',
                  label: 'Date picker',
                  props: {
                    readOnly: true,
                    type: 'date',
                    format: 'DD.MM.YYYY',
                    placeholder: '04.10.2001',
                  },
                },
                {
                  type: 'datetime',
                  name: 'datetime7',
                  dataType: 'array',
                  label: 'Date time range',
                  props: {
                    type: 'datetimerange',
                  },
                },
              ],
            },
          ],
        },

        /** Dropzone */
        {
          type: 'row',
          props: {},
          fields: [
            {
              type: 'dropzone',
              name: 'photo',
              label: 'Dropzone',
              dataType: 'array',
              props: {
                multiple: true,
              },
            },
          ],
        },

        /** Editors */
        {
          type: 'column',
          title: 'Editors',
          props: {
            sm: {
              span: 16,
              offset: 4,
            },
            xs: {
              span: 24,
              offset: 0,
            },
            isPaper: true,
            titleType: 'heading',
          },
          fields: [
            {
              type: 'editor',
              name: 'editor1',
              props: {
                id: 'editor1',
                placeholder: 'Начните вводить текст',
              },
            },
          ],
        },

        /** Form Collection row */
        {
          type: 'row',
          title: 'Form collection',
          props: {
            class: 'test-form-collection',
          },
          fields: [
            {
              type: 'collection',
              name: 'people',
              dataType: 'array',
              props: {
                class: 'collection-people',
                showFirst: true,
                firstRemovable: false,
              },
              layout: [
                {
                  type: 'column',
                  props: {
                    class: 'test-form-collection_name',
                    span: 8,
                    xs: 24,
                  },
                  fields: [
                    {
                      type: 'input',
                      name: 'firstname',
                      props: {
                        type: 'text',
                        placeholder: 'Name',
                      },
                      validation: {
                        type: 'empty',
                        trigger: 'blur',
                      },
                    },
                  ],
                },
                {
                  type: 'column',
                  props: {
                    span: 8,
                    xs: 24,
                  },
                  fields: [
                    {
                      type: 'input',
                      name: 'lastname',
                      props: {
                        type: 'text',
                        placeholder: 'Surname',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    dialogForms: [],
  },
});
