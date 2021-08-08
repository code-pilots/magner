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
    fields: [
      {
        type: 'input',
        name: 'phone',
        label: translate('form_test.form.phone_label'),
        column: 1,
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
        column: 1,
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
        type: 'divider',
        name: 'first',
        component: {},
      },

      {
        type: 'select',
        name: 'country',
        label: translate('form_test.form.country_label'),
        column: 1,
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
        changeAction: (form, config) => {
          const city = config.fields.find((field) => field.name === 'cityId') as SelectField;

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
        column: 2,
        hidden: true,
        component: {
          placeholder: translate('form_test.form.city_plain_placeholder'),
        },
        options: [],
      },

      {
        type: 'divider',
        name: 'radios',
        component: {},
      },

      {
        type: 'radio',
        name: 'radio',
        label: '',
        column: 1,
        component: {},
        options: RadioOptions,
      },

      {
        type: 'radio',
        name: 'radio-button',
        label: '',
        column: 2,
        radioButtons: true,
        component: {},
        options: RadioOptions,
      },

      {
        type: 'checkbox',
        name: 'checkbox',
        dataType: 'array',
        label: '',
        column: 1,
        component: {},
        options: RadioOptions,
      },

      {
        type: 'checkbox',
        name: 'checkbox-button',
        dataType: 'array',
        label: '',
        column: 2,
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

      {
        type: 'switch',
        dataType: 'boolean',
        name: 'isactive',
        label: '',
        column: 1,
        component: {
          inactiveLabel: translate('form_test.form.switch_label'),
        },
      },

      {
        type: 'divider',
        name: 'last',
        component: {},
      },

      {
        type: 'dropzone',
        name: 'photo',
        label: translate('form_test.form.dropzone_label'),
        column: 1,
        component: {},
      },
    ],
  },
});
