import loginRequest from 'app/requests/login';
import type { TableConfig } from '../../core/types/configs';

/**
 * Configuration for the 'table' route preset.
 */
const tableConfig: TableConfig = {
  title: 'Таблица',
  request: loginRequest,
  dataField: '',
  submit: {
    text: 'Войти',
  },
  filters: [],
  table: [],
};

export default tableConfig;
