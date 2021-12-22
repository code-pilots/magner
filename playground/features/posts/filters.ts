import {
  action,
  actionTable,
  filtersFormController,
  translate,
  openModal,
} from 'lib/index';
import { Post } from './requests';
import postConfig from './post';

const postsFilters = filtersFormController<Post>({
  fieldsShowAmount: 1,

  actions: [
    {
      type: 'action',
      emits: 'update-table',
      action: actionTable(async ({ data }) => {
        try {
          await openModal<any>({
            type: 'card',
            config: postConfig,
            props: {
              emptyCard: true,
              entityId: null,
            },
          });
          return false;
        } catch (e) {
          return translate('posts.failed_creation');
        }
      }),
      props: {
        type: 'danger',
        text: translate('posts.create_in_modal'),
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

  layout: [
    {
      type: 'input',
      name: 'text',
      props: {
        placeholder: translate('post.name_input'),
      },
    },
    {
      type: 'input',
      name: 'likes',
      props: {
        placeholder: 'Likes',
      },
    },
  ],
});

export default postsFilters;
