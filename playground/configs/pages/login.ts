import { loginPageController, translate } from 'lib/index';
import loginRequest from '../../app/requests/login';

const loginPageConfig = loginPageController({
  title: translate('login.title'),
  request: loginRequest,
  form: {
    actions: [{ action: 'submit' }],
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
