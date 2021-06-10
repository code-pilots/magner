import loginRequest from 'app/requests/login';
import { loginPageController } from 'core/controllers';

const loginPageConfig = loginPageController({
  title: 'Вход',
  request: loginRequest,
  form: {
    submit: {
      text: 'Войти',
    },
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
          icon: 'mail',
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
          icon: 'lock',
        },
      },
    ],
  },
});

export default loginPageConfig;
