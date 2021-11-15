import {
  translate, cardPageController, request, SelectField,
} from 'lib/index';
import {
  bigtestCreate, bigtestDelete, bigtestGet, bigtestUpdate,
} from '../../app/requests/big-test';

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

export default cardPageController({
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
              name: 'phone',
              label: 'Phone',
              validation: {
                type: 'phone',
                trigger: 'blur',
              },
              props: {
                readOnly: true,
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
                readOnly: true,
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
                readOnly: true,
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
                const parentCategoryField = getField<SelectField>('parentCategory');
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
                  props: {
                    readOnly: true,
                  },
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
                    readOnly: true,
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
              props: {
                readOnly: true,
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
                readOnly: true,
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
                readOnly: true,
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
