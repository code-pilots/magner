import loginRequest from 'app/requests/login';
import { loginPageController, translate } from 'core/index';

const loginPageConfig = loginPageController({
  title: translate('login.title'),
  request: loginRequest,
  form: {
    submit: {
      text: translate('login.submitButton'),
    },
    layout: [
      {
        type: 'input',
        name: 'login',
        required: false,
        validation: {
          type: 'empty',
          trigger: 'blur',
        },
        props: {
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
          type: 'empty',
          trigger: 'blur',
        },
        props: {
          type: 'password',
          placeholder: translate('login.fields.password_placeholder'),
          icon: 'lock',
        },
      },
    ],
  },
});

export default loginPageConfig;
