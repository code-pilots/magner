import loginRequest from 'app/requests/login';
import type { CardConfig } from 'core/types/configs';

/**
 * Configuration for the 'card' route preset.
 */
const cardConfig: CardConfig = {
  title: 'Карточка',
  request: loginRequest,
  fields: [],
  submit: {
    text: 'Подтвердить',
  },
};

export default cardConfig;
