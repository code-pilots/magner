import { loginPageController, translate } from 'lib/index';
import loginRequest from '../../app/requests/login';

const loginPageConfig = loginPageController({
  title: translate('login.title'),
  request: loginRequest,
  form: {
    actions: [{
      action: 'submit',
      type: 'primary',
    }],
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
          icon: () => import('../../assets/icons/mail.svg'),
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
          icon: () => import('../../assets/icons/lock.svg'),
        },
      },
    ],
  },
});

export default loginPageConfig;
