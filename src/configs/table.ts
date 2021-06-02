import loginRequest from 'app/requests/login';
import type { TableConfig } from 'settings/types/configs';

/**
 * Configuration for the 'table' route preset.
 */
const tableConfig: TableConfig = {
  title: 'Таблица',
  request: loginRequest,
  dataField: '',
  table: [],
};

export default tableConfig;
