import loginRequest from 'app/requests/login';
import { tablePageController } from 'core/controllers';

/**
 * Configuration for the 'table' route preset.
 */
export default tablePageController({
  title: 'Таблица',
  request: loginRequest,
  dataField: '',

  filters: {
    fields: [],
    submit: {
      text: 'Войти',
    },
  },
  table: {
    rows: [],
  },
});
