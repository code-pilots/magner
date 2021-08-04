import { cardPageController } from 'core/controllers';
import { bigtestCreate, bigtestGet, bigtestUpdate } from 'app/requests/big-test';
import { SelectField } from 'core/types/form/select';

export default cardPageController({
  title: 'Тест формы',
  getRequest: bigtestGet,
  createRequest: bigtestCreate,
  updateRequest: bigtestUpdate,

  form: {
    submit: {
      text: 'Сохранить',
    },
    fields: [
      {
        type: 'input',
        name: 'phone',
        label: 'Пример текстового инпута с маской',
        column: 1,
        validation: {
          type: 'empty',
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
        label: 'Город',
        column: 1,
        hidden: true,
        component: {
          placeholder: 'Выбрать',
        },
        options: [],
        validation: null,
      },

      {
        type: 'select',
        name: 'country',
        label: 'Страна (пример взаимодействующих инпутов)',
        column: 1,
        options: [
          {
            value: 'rus',
            label: 'Россия',
          },
          {
            value: 'norus',
            label: 'Не Россия',
          },
        ],
        validation: null,
        component: {
          placeholder: 'Выбрать',
          clearable: true,
        },
        changeAction: (form, config) => {
          const city = config.fields.find((field) => field.name === 'cityId') as SelectField;

          if (city) {
            if (form.country === 'rus') {
              city.hidden = false;
              city.options = [{
                value: 'mos',
                label: 'Москва',
              }];
            } else if (form.country) {
              city.hidden = false;
              city.options = [{
                value: 'ber',
                label: 'Берлин',
              }];
            } else {
              city.hidden = true;
            }
          }
        },
      },
    ],
  },
});
