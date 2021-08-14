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
      component: {
        justify: 'space-between',
      },
      layout: [
        /** Custom field that interacts with dialog forms */
        {
          type: 'row',
          fields: [
            {
              type: 'custom',
              name: 'dialogger',
              element: () => DialogOpener,
              component: {
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

        /** Form Collection row */
        {
          type: 'row',
          class: 'test-form-collection',
          title: translate('form_test.form.collection.title'),
          fields: [
            {
              type: 'collection',
              name: 'people',
              dataType: 'array',
              component: {
                showFirst: true,
                firstRemovable: false,
              },
              layout: [
                {
                  type: 'column',
                  class: 'test-form-collection_name',
                  component: {
                    span: 8,
                    xs: 24,
                  },
                  fields: [
                    {
                      type: 'input',
                      name: 'firstname',
                      component: {
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
                  component: {
                    span: 8,
                    xs: 24,
                  },
                  fields: [
                    {
                      type: 'input',
                      name: 'lastname',
                      component: {
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

        /** Text fields, selects */
        {
          type: 'column',
          component: {
            span: 10,
            xs: 24,
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
              component: {
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
              component: {
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
              component: {
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
              component: {
                placeholder: translate('form_test.form.city_plain_placeholder'),
              },
              options: [],
            },
          ],
        },

        /** Radio buttons, checkboxes, switches */
        {
          type: 'column',
          component: {
            span: 14,
            xs: 24,
          },
          layout: [
            {
              type: 'row',
              title: 'Radio buttons',
              component: {
                justify: 'space-between',
              },
              fields: [
                {
                  type: 'radio',
                  name: 'radio',
                  component: {},
                  options: RadioOptions,
                },
                {
                  type: 'radio',
                  name: 'radio-button',
                  radioButtons: true,
                  component: {},
                  options: RadioOptions,
                },
              ],
            },
            {
              type: 'row',
              title: 'Checkboxes',
              component: {
                justify: 'space-between',
              },
              fields: [
                {
                  type: 'checkbox',
                  name: 'checkbox',
                  dataType: 'array',
                  component: {},
                  options: RadioOptions,
                },
                {
                  type: 'checkbox',
                  name: 'checkbox-button',
                  dataType: 'array',
                  checkboxButtons: true,
                  component: {
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
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'switch',
                  dataType: 'boolean',
                  name: 'isactive',
                  label: 'Switch',
                  component: {
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
          fields: [
            {
              type: 'dropzone',
              name: 'photo',
              label: translate('form_test.form.dropzone_label'),
              component: {},
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
            component: {
              type: 'text',
              placeholder: translate('form_test.form.dialog.city_placeholder'),
            },
          },
          {
            type: 'input',
            name: 'timezone',
            label: translate('form_test.form.dialog.timezone'),
            component: {
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
            custom.component.city = res;
            dialog.open = false;
          }
        },
      },
    ],
  },
});
