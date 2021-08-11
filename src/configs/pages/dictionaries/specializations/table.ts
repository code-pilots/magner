import { tablePageController } from 'core/controllers';
import specializationsRequest from 'app/requests/dictionaries/specializations';

const specializationTable = tablePageController({
  title: 'Специализации',
  request: specializationsRequest,

  table: {
    rowLink: (row) => ({ name: 'specialization', params: { id: row.id } }),
    columns: [
      {
        prop: 'id',
        label: 'ID',
        width: 80,
      },
      {
        prop: 'title',
        label: 'Название',
        width: 'auto',
        showOverflowTooltip: true,
      },
      {
        prop: 'type',
        label: 'Тип',
        width: 300,
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

export default specializationTable;
