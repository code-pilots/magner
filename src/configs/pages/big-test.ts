import { cardPageController } from 'core/controllers';
import {
  bigtestCreate, bigtestDelete, bigtestGet, bigtestUpdate,
} from 'app/requests/big-test';
import type { SelectField } from 'core/types/form/fields/select';
import type { CustomField } from 'core/types/form/fields/custom';
import { citiesCreate, citiesGet } from 'app/requests/citites';
import translate from 'core/utils/translate';
import DialogOpener from 'app/components/dialog-opener.vue';
import { requestWrapper } from 'core/utils/request';

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
        /** Text fields, selects */
        {
          type: 'column',
          props: {
            span: 24,
          },
          fields: [
            {
              type: 'input',
              name: 'phone',
              label: translate('form_test.form.phone_label'),
              validation: {
                type: 'phone',
                trigger: 'blur',
              },
              props: {
                type: 'tel',
                placeholder: '+7-915-820-14-02',
                mask: {
                  mask: '+7-###-###-##-##',
                },
              },
            },

            {
              type: 'select',
              name: 'city',
              label: translate('form_test.form.city_label'),
              props: {
                filterable: true,
                remote: true,
                remoteMethod: citiesGet,
                valueKey: 'id',
                labelKey: 'name',
                placeholder: translate('form_test.form.city_placeholder'),
                loadingText: translate('form_test.form.city_loading_text'),
                noDataText: translate('form_test.form.city_no_data_text'),
              },
              options: [],
            },

            {
              type: 'select',
              name: 'country',
              label: translate('form_test.form.country_label'),
              options: [
                {
                  value: 'rus',
                  label: translate('form_test.form.country_russia'),
                },
                {
                  value: 'norus',
                  label: translate('form_test.form.country_norussia'),
                },
              ],
              props: {
                placeholder: translate('form_test.form.country_placeholder'),
                clearable: true,
              },
              hint: translate('form_test.form.country_hint'),
              changeAction: ({ form, getField }) => {
                const city = getField<SelectField>('cityId');

                if (city) {
                  if (form.country === 'rus') {
                    city.hidden = false;
                    city.options = [{
                      value: 'mos',
                      label: translate('form_test.form.city_moscow'),
                    }];
                  } else if (form.country) {
                    city.hidden = false;
                    city.options = [{
                      value: 'ber',
                      label: translate('form_test.form.city_berlin'),
                    }];
                  } else {
                    city.hidden = true;
                  }
                }
              },
            },

            {
              type: 'select',
              name: 'cityId',
              label: translate('form_test.form.city_plain_label'),
              hidden: true,
              props: {
                placeholder: translate('form_test.form.city_plain_placeholder'),
              },
              options: [],
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
                  props: {},
                  options: RadioOptions,
                },
                {
                  type: 'radio',
                  name: 'radio-button',
                  radioButtons: true,
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
                  name: 'checkbox',
                  dataType: 'array',
                  props: {},
                  options: RadioOptions,
                },
                {
                  type: 'checkbox',
                  name: 'checkbox-button',
                  dataType: 'array',
                  checkboxButtons: true,
                  props: {
                    max: 3,
                  },
                  options: [
                    ...RadioOptions,
                    {
                      value: 'teen',
                      label: translate('form_test.form.option_teen'),
                    },
                    {
                      value: 'young',
                      label: translate('form_test.form.option_young'),
                    },
                    {
                      value: 'old',
                      label: translate('form_test.form.option_old'),
                    },
                  ],
                },
                {
                  type: 'switch',
                  dataType: 'boolean',
                  name: 'isactive',
                  label: 'Switch',
                  props: {
                    inactiveLabel: translate('form_test.form.switch_label'),
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
              label: translate('form_test.form.dropzone_label'),
              props: {},
            },
          ],
        },

        /** Form Collection row */
        {
          type: 'row',
          title: translate('form_test.form.collection.title'),
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
                        placeholder: translate('form_test.form.collection.name_placeholder'),
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
                        placeholder: translate('form_test.form.collection.surname_placeholder'),
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },

        /** Custom field that interacts with dialog forms */
        {
          type: 'column',
          props: {
            span: 12,
            xs: 24,
          },
          fields: [
            {
              type: 'custom',
              name: 'dialogger',
              component: () => DialogOpener,
              props: {
                city: 'Create a city from the dialog menu',
              },
              changeAction: ({ getDialogForm }) => {
                const dialog = getDialogForm('suspect');
                if (dialog) {
                  dialog.open = true;
                }
              },
            },
          ],
        },
      ],
    },

    /** Dialog form that creates an entity 'city' and passes it to the custom component */
    dialogForms: [
      {
        name: 'suspect',
        title: translate('form_test.form.dialog.title'),
        open: false,
        submit: {
          text: translate('form_test.submit_text'),
        },
        layout: [
          {
            type: 'input',
            name: 'name',
            label: translate('form_test.form.dialog.city_label'),
            props: {
              type: 'text',
              placeholder: translate('form_test.form.dialog.city_placeholder'),
            },
          },
          {
            type: 'input',
            name: 'timezone',
            label: translate('form_test.form.dialog.timezone'),
            props: {
              type: 'text',
              placeholder: translate('form_test.form.dialog.timezone_placeholder'),
            },
          },
        ],
        submitAction: async (data, { form, getField, getDialogForm }) => {
          const res = await requestWrapper(data, citiesCreate);

          const custom = getField<CustomField>('dialogger');
          const dialog = getDialogForm('suspect');
          if (custom && dialog) {
            custom.props.city = res;
            dialog.open = false;
          }
        },
      },
    ],
  },
});
