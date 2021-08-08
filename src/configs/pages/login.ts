import loginRequest from 'app/requests/login';
import { loginPageController } from 'core/controllers';
import translate from 'core/utils/translate';

const loginPageConfig = loginPageController({
  title: translate('login.title'),
  request: loginRequest,
  form: {
    submit: {
      text: translate('login.submitButton'),
    },
    fields: [
      {
        type: 'input',
        name: 'login',
        required: false,
        validation: {
          type: 'empty',
          trigger: 'blur',
        },
        component: {
          type: 'text',
          placeholder: translate('login.fields.email_placeholder'),
          icon: 'mail',
        },
      },
      {
        type: 'input',
        name: 'password',
        required: false,
        validation: {
          type: 'password',
          trigger: 'blur',
        },
        component: {
          type: 'password',
          placeholder: translate('login.fields.password_placeholder'),
          icon: 'lock',
        },
      },
    ],
  },
});

export default loginPageConfig;
