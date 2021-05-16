import { LoginConfig } from 'settings/types';

const loginConfig: LoginConfig = {
  title: 'Вход',
  fields: [
    {
      type: 'input',
      name: 'email',
      backendName: null,
      required: false,
      validation: {
        type: 'email',
        trigger: 'blur',
      },
      component: {
        type: 'email',
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
