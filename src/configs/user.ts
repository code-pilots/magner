import loginRequest from 'app/requests/login';
import type { CardConfig } from 'settings/types/configs';

/**
 * Real-life example of extending the CardConfig route in case of the user card
 */
const userConfig: CardConfig = {
  title: 'Пользователь',
  request: loginRequest,
};

export default userConfig;
