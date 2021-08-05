import { cardPageController } from 'core/controllers';
import {
  bigtestCreate, bigtestDelete, bigtestGet, bigtestUpdate,
} from 'app/requests/big-test';
import { SelectField } from 'core/types/form/select';
import citiesRequest from 'app/requests/citites';

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
        name: 'cityId',
        label: 'City',
        column: 1,
        hidden: true,
        component: {
          placeholder: 'Choose',
        },
        options: [],
        validation: null,
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
        validation: null,
        component: {
          placeholder: 'Choose',
          clearable: true,
        },
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
        validation: null,
      },

      {
        type: 'radio',
        name: 'radio',
        label: 'Radio group example',
        column: 1,
        component: {},
        validation: null,
        options: [
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
        ],
      },

      {
        type: 'radio',
        name: 'radio-button',
        label: 'Example of the radio-button group',
        column: 1,
        radioButtons: true,
        component: {},
        validation: null,
        options: [
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
        ],
      },

      {
        type: 'dropzone',
        name: 'photo',
        label: 'Dropzone example',
        column: 1,
        component: {},
        validation: null,
      },
    ],
  },
});
