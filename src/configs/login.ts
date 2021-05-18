import { LoginConfig } from 'settings/types/configs';
import loginRequest from 'app/requests/login';

const loginConfig: LoginConfig = {
  title: 'Вход',
  submit: {
    text: 'Войти',
  },
  request: loginRequest,
  fields: [
    {
      type: 'input',
      name: 'email',
      backendName: 'login',
      required: false,
      validation: {
        type: 'empty',
        trigger: 'blur',
      },
      component: {
        type: 'text',
        placeholder: 'Е-мейл',
        icon: 'email',
      },
    },
    {
      type: 'input',
      name: 'password',
      backendName: null,
      required: false,
      validation: {
        type: 'password',
        trigger: 'blur',
      },
      component: {
        type: 'password',
        placeholder: 'Пароль',
        icon: 'password',
      },
    },
  ],
};

export default loginConfig;
