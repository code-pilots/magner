import { cardPageController } from 'core/controllers';
import {
  bigtestCreate, bigtestDelete, bigtestGet, bigtestUpdate,
} from 'app/requests/big-test';
import { SelectField } from 'core/types/form/select';
import citiesRequest from 'app/requests/citites';
import translate from 'core/utils/translate';

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
    submit: {
      text: translate('form_test.submit_text'),
    },
    layout: {
      type: 'row',
      component: {
        gutter: 20,
      },
      layout: [
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
                remoteMethod: citiesRequest,
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
              changeAction: (form, getField, config) => {
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
        {
          type: 'column',
          component: {
            span: 14,
            xs: 24,
          },
          layout: [
            {
              type: 'row',
              layout: [
                {
                  type: 'column',
                  component: {
                    span: 8,
                    xs: 24,
                  },
                  fields: [
                    {
                      type: 'radio',
                      name: 'radio',
                      label: 'Radio example',
                      component: {},
                      options: RadioOptions,
                    },
                    {
                      type: 'checkbox',
                      name: 'checkbox',
                      dataType: 'array',
                      label: 'Checkboxes',
                      component: {},
                      options: RadioOptions,
                    },
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
                {
                  type: 'column',
                  component: {
                    span: 16,
                    xs: 24,
                  },
                  fields: [
                    {
                      type: 'radio',
                      name: 'radio-button',
                      label: 'Radio button example',
                      radioButtons: true,
                      component: {},
                      options: RadioOptions,
                    },
                    {
                      type: 'checkbox',
                      name: 'checkbox-button',
                      dataType: 'array',
                      label: 'Checkbox buttons',
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
              ],
            },
          ],
        },
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
  },
});
