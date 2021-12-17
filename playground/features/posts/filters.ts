import { filtersFormController, translate } from 'lib/index';
import { Post } from './requests';

const postsFilters = filtersFormController<Post>({
  fieldsShowAmount: 1,

  linkToCreateNew: {
    routeName: 'post',
    label: translate('post.new_post'),
  },

  saveToLocalStorage: true,

  actions: [],
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
