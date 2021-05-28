import loginRequest from 'app/requests/login';
import type { CardConfig } from 'settings/types/configs';

/**
 * Configuration for the 'card' route preset.
 */
const cardConfig: CardConfig = {
  title: 'Карточка',
  request: loginRequest,
};

export default cardConfig;
