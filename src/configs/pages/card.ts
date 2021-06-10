import loginRequest from 'app/requests/login';
import { cardPageController } from 'core/controllers';

/**
 * Configuration for the 'card' route preset.
 */
export default cardPageController({
  title: 'Карточка',
  request: loginRequest,
  form: {
    submit: {
      text: 'Подтвердить',
    },
    fields: [],
  },
});
