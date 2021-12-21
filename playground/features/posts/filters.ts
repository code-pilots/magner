import {
  action,
  actionTable,
  filtersFormController,
  translate,
} from 'lib/index';
import { Post } from './requests';

const postsFilters = filtersFormController<Post>({
  fieldsShowAmount: 1,

  actions: [
    {
      type: 'action',
      emits: 'update-table',
      action: actionTable(async ({ data }) => {
        console.log(data);
        return false;
      }),
      props: {
        type: 'danger',
        text: 'Open modal',
      },
    },
    {
      type: 'link',
      to: { name: 'post', params: { id: 'new' } },
      external: false,
      props: {
        type: 'primary',
        text: translate('post.new_post'),
      },
    },
  ],

  saveToLocalStorage: true,

  submitEvent: 'input',

  filtersData: {},
  sort: {},
  pagination: {
    items: 100,
    page: 1,
  },

  layout: [{
    type: 'input',
    name: 'text',
    props: {
      placeholder: translate('post.name_input'),
    },
  }],
});

export default postsFilters;
