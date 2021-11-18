import { cardPageController } from 'lib/controllers';
import { translate } from 'lib/utils';
import {
  createPost, deletePost, getPost, Post, updatePost,
} from '../../../app/requests/posts';
import { readUsers } from '../../../app/requests/users';
import imageUploadRequest from '../../../app/requests/image-upload';

const postConfig = cardPageController<Post>({
  header: {
    title: translate('post.form_title'),
  },

  getRequest: getPost,
  createRequest: createPost,
  updateRequest: updatePost,
  deleteRequest: deletePost,

  form: {
    debug: true,

    actions: [
      {
        action: 'submit',
        type: 'primary',
        text: translate('post.submit'),
      },
      {
        action: 'remove',
        type: 'danger',
        text: translate('post.remove'),
      },
    ],

    layout: {
      type: 'row',
      props: {
        gutter: 24,
      },
      layout: [
        {
          type: 'column',
          props: { span: 12, xs: 24 },
          fields: [
            {
              type: 'input',
              name: 'text',
              label: translate('post.name_input'),
              props: {},
            },
            {
              type: 'select',
              name: 'owner',
              dataType: 'array',
              label: translate('post.tags_input'),
              options: [{
                value: 1,
                label: translate('post.tags_1'),
              }, {
                value: 2,
                label: translate('post.tags_2'),
              }, {
                value: 3,
                label: translate('post.tags_3'),
              }, {
                value: 4,
                label: translate('post.tags_4'),
              }, {
                value: 5,
                label: translate('post.tags_5'),
              }],
              props: {
                multiple: true,
                multipleLimit: 5,
                clearable: true,
              },
            },
            {
              type: 'select',
              name: 'owner',
              dataType: 'string',
              label: translate('post.owner_input'),
              options: [],
              props: {
                remote: true,
                remoteMethod: readUsers,
                valueKey: 'id',
                labelKey: 'firstName',
              },
            },
          ],
        },
        {
          type: 'column',
          props: { span: 12, xs: 24 },
          fields: [
            {
              type: 'input',
              name: 'likes',
              label: translate('post.likes_input'),
              props: {
                placeholder: '5',
              },
            },
            {
              type: 'dropzone',
              name: 'image',
              label: translate('post.dropzone_input'),
              props: {
                saveToBackend: imageUploadRequest,
                valueKey: 'id',
                srcKey: 'photo',
              },
            },
          ],
        },
      ],
    },
  },
});

export default postConfig;
