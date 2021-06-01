import loginRequest from 'app/requests/login';
import type { CardConfig } from 'settings/types/configs';

/**
 * Real-life example of extending the CardConfig route in case of the user card
 */
const userConfig: CardConfig = {
  title: 'Пользователь',
  request: loginRequest,
  submit: {
    text: 'Сохранить',
  },
  fields: [
    {
      type: 'input',
      name: 'name',
      backendName: 'name',
      dataType: 'string',
      component: {
        type: 'text',
        placeholder: 'Иван',
      },
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
    },
    {
      type: 'checkbox',
      name: 'working',
      backendName: 'working',
      dataType: 'boolean',
      component: {
        label: 'Работает',
      },
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
    },
  ],
};

export default userConfig;
