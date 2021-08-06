import { cardPageController } from 'core/controllers';
import {
  bigtestCreate, bigtestDelete, bigtestGet, bigtestUpdate,
} from 'app/requests/big-test';
import { SelectField } from 'core/types/form/select';
import citiesRequest from 'app/requests/citites';

const RadioOptions = [
  {
    value: 'all',
    label: 'Any',
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
  title: 'Form example',
  getRequest: bigtestGet,
  createRequest: bigtestCreate,
  updateRequest: bigtestUpdate,
  deleteRequest: bigtestDelete,

  confirmDelete: true,

  form: {
    submit: {
      text: 'Save',
    },
    fields: [
      {
        type: 'input',
        name: 'phone',
        label: 'Example of the text input with a mask and validation',
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
        label: 'Example of the select with remote data loading',
        column: 1,
        component: {
          filterable: true,
          remote: true,
          remoteMethod: citiesRequest,
          valueKey: 'id',
          labelKey: 'name',
          placeholder: 'Moscow',
          loadingText: 'Loading',
          noDataText: 'No city were found',
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
        label: 'Country (example of field interactions)',
        column: 1,
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
        component: {
          placeholder: 'Choose',
          clearable: true,
        },
        hint: `When you select the country, a city field will appear<br/>
        with pre-added options (cities of concrete country)`,
        changeAction: (form, config) => {
          const city = config.fields.find((field) => field.name === 'cityId') as SelectField;

          if (city) {
            if (form.country === 'rus') {
              city.hidden = false;
              city.options = [{
                value: 'mos',
                label: 'Moscow',
              }];
            } else if (form.country) {
              city.hidden = false;
              city.options = [{
                value: 'ber',
                label: 'Berlin',
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
        label: 'City',
        column: 2,
        hidden: true,
        component: {
          placeholder: 'Choose',
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
        label: 'Radio group example',
        column: 1,
        component: {},
        options: RadioOptions,
      },

      {
        type: 'radio',
        name: 'radio-button',
        label: 'Example of the radio-button group',
        column: 2,
        radioButtons: true,
        component: {},
        options: RadioOptions,
      },

      {
        type: 'checkbox',
        name: 'checkbox',
        dataType: 'array',
        label: 'Checkbox group example',
        column: 1,
        component: {},
        options: RadioOptions,
      },

      {
        type: 'checkbox',
        name: 'checkbox-button',
        dataType: 'array',
        label: 'Example of the checkbox-button group. Maximum 3 checks allowed',
        column: 2,
        checkboxButtons: true,
        component: {
          max: 3,
        },
        options: [
          ...RadioOptions,
          {
            value: 'teen',
            label: 'Teenager',
          },
          {
            value: 'young',
            label: 'Young',
          },
          {
            value: 'old',
            label: 'Old',
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
          inactiveLabel: 'Are you active?',
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
        label: 'Dropzone example',
        column: 1,
        component: {},
      },
    ],
  },
});
