import { formController } from 'core/controllers';
import { citiesGet } from 'app/requests/citites';
import translate from 'core/utils/translate';

const patientForm = formController({
  submit: {
    text: translate('patient.form.submit_button'),
  },
  layout: {
    type: 'row',
    props: {
      gutter: 24,
    },
    layout: [
      {
        type: 'column',
        props: {
          span: 12,
          xs: 24,
        },
        fields: [
          {
            type: 'input',
            name: 'surname',
            label: translate('patient.form.lastname_label'),
            props: {
              type: 'text',
              placeholder: translate('patient.form.lastname_placeholder'),
            },
            validation: {
              type: 'empty',
              trigger: 'blur',
            },
          },
          {
            type: 'input',
            name: 'firstname',
            label: translate('patient.form.firstname_label'),
            props: {
              type: 'text',
              placeholder: translate('patient.form.firstname_placeholder'),
            },
            validation: {
              type: 'empty',
              trigger: 'blur',
            },
          },
          {
            type: 'input',
            name: 'patronymic',
            label: translate('patient.form.patronymic_label'),
            props: {
              type: 'text',
              placeholder: translate('patient.form.patronymic_placeholder'),
            },
            validation: {
              type: 'empty',
              trigger: 'blur',
            },
          },
          {
            type: 'input',
            name: 'email',
            label: translate('patient.form.email_label'),
            validation: {
              type: 'email',
              trigger: 'blur',
            },
            props: {
              type: 'email',
              placeholder: 'ivanivanov@gmail.com',
              icon: 'mail',
            },
          },
          {
            type: 'input',
            name: 'phone',
            label: translate('patient.form.phone_number_label'),
            validation: {
              type: 'empty',
              trigger: 'blur',
            },
            props: {
              type: 'tel',
              placeholder: translate('patient.form.phone_number_placeholder'),
              mask: {
                mask: '+7-###-###-##-##',
              },
            },
          },
          {
            type: 'input',
            name: 'birthDate',
            label: translate('patient.form.birthday_label'),
            props: {
              type: 'text',
              placeholder: translate('patient.form.birthday_placeholder'),
              mask: {
                mask: '####-##-##',
              },
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
          span: 12,
          xs: 24,
        },
        fields: [
          {
            type: 'select',
            name: 'gender',
            label: translate('patient.form.gender_label'),
            options: [
              {
                value: 'female',
                label: translate('patient.form.gender_female'),
              },
              {
                value: 'male',
                label: translate('patient.form.gender_male'),
              },
            ],
            props: {
              placeholder: translate('patient.form.gender_placeholder'),
            },
          },

          {
            type: 'select',
            name: 'cityId',
            label: translate('patient.form.city_label'),
            props: {
              filterable: true,
              remote: true,
              remoteMethod: citiesGet,
              valueKey: 'id',
              labelKey: 'name',
              placeholder: translate('patient.form.city_placeholder'),
              loadingText: translate('patient.form.city_loading_text'),
              noDataText: translate('patient.form.city_no_data_text'),
            },
            options: [],
          },
          {
            type: 'input',
            name: 'address',
            label: translate('patient.form.address_label'),
            props: {
              type: 'text',
              placeholder: translate('patient.form.address_placeholder'),
            },
            validation: {
              type: 'empty',
              trigger: 'blur',
            },
          },
          {
            type: 'input',
            name: 'apartment',
            label: translate('patient.form.apartments_label'),
            props: {
              type: 'text',
              placeholder: translate('patient.form.apartments_placeholder'),
            },
            validation: {
              type: 'empty',
              trigger: 'blur',
            },
          },

          {
            type: 'dropzone',
            name: 'photo',
            label: translate('patient.form.photo_label'),
            props: {},
          },
        ],
      },
    ],
  },
});

export default patientForm;
