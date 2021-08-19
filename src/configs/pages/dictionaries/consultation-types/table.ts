import { tablePageController } from 'core/controllers';
import consultationTypeRequest from 'app/requests/dictionaries/consultation-types';

const consultationTypesTable = tablePageController({
  title: 'Типы консультаций',
  request: consultationTypeRequest,

  table: {
    // rowLink: (row) => ({ name: 'consultation-type', params: { id: row.id } }),
    columns: [
      {
        prop: 'id',
        label: 'ID',
        width: 80,
      },
      {
        prop: 'title',
        label: 'Название',
        width: 300,
        showOverflowTooltip: true,
      },
      {
        prop: 'description',
        label: 'Описание',
        width: 'auto',
        showOverflowTooltip: true,
      },
      {
        prop: 'duration',
        label: 'Длительность',
        width: 150,
      },
      {
        prop: 'cancellationAllowed',
        label: 'Разрешена отмена',
        width: 200,
      },
    ],
  },

  filters: {
    submit: null,
    filtersData: {},
    sort: {},
    pagination: {
      items: 25,
      page: 1,
    },
    layout: [],
  },
});

export default consultationTypesTable;
