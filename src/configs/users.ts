import loginRequest from 'app/requests/login';
import type { TableConfig } from 'settings/types/configs/table';

/**
 * Since Users extend the 'table' route preset, it must extend TableConfig.
 * Read more about table configuration in app/configs/table.ts
 */
const usersConfig: TableConfig = {
  title: 'Пользователи',
  request: loginRequest,
};

export default usersConfig;
