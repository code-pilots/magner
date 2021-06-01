import usersRequest from 'app/requests/users';
import type { TableConfig } from 'settings/types/configs/table';

/**
 * Since Users extend the 'table' route preset, it must extend TableConfig.
 * Read more about table configuration in app/configs/table.ts
 */
const usersConfig: TableConfig = {
  title: 'Пользователи',
  request: usersRequest,
};

export default usersConfig;
