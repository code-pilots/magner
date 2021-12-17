import { loginPageController, translate } from 'lib/index';
import loginRequest from './requests';

const loginPageConfig = loginPageController({
  title: translate('login.title'),
  request: loginRequest,
  form: {
    actions: [{
      type: 'action',
      emits: 'submit',
      props: {
        type: 'primary',
        text: translate('post.submit'),
      },
    }],
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
          icon: () => import('../../assets/icons/mail.svg'),
        },
      },
      {
        type: 'input',
        name: 'password',
        validation: {
          type: 'empty',
          trigger: 'blur',
        },
        props: {
          required: false,
          type: 'password',
          placeholder: translate('login.fields.password_placeholder'),
          icon: () => import('../../assets/icons/lock.svg'),
        },
      },
    ],
  },
});

export default loginPageConfig;
