import { loginPageController, translate } from 'magner';
import loginRequest from './requests';

const loginPageConfig = loginPageController({
  title: translate('login.title'),
  request: loginRequest,
  form: {
    submitOnEnter: true,

    actions: [
      {
        type: 'action',
        emits: 'submit',
        props: {
          type: 'primary',
          text: translate('login.submitButton'),
        },
      },
    ],
    layout: [
      {
        type: 'input',
        name: 'login',
        validation: {
          type: 'empty',
          trigger: 'blur',
        },
        props: {
          required: false,
          type: 'text',
          placeholder: translate('login.fields.email_placeholder'),
          icon: () => import('./mail.svg'),
        },
      },
      {
        type: 'input',
        name: 'password',
        validation: {
          type: 'password',
          trigger: 'blur',
        },
        props: {
          required: false,
          type: 'password',
          placeholder: translate('login.fields.password_placeholder'),
          icon: () => import('./lock.svg'),
        },
      },
    ],
  },
});

export default loginPageConfig;
