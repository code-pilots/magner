import { AuthConfig } from 'settings/types';

const authConfig: AuthConfig = {
  login: {
    title: 'Вход',
    fields: [
      {
        type: 'input',
        component: {
          name: 'email',
          type: 'email',
          placeholder: 'Е-мейл',
        },
      },
      {
        type: 'input',
        component: {
          name: 'password',
          type: 'password',
          placeholder: 'Пароль',
        },
      },
    ],
  },
};

export default authConfig;
