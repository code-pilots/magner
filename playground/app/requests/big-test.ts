import { request } from 'lib/index';

export const bigtestGet = request(async () => ({
  data: {
    editor1: {
      time: 1636442791295,
      blocks: [
        {
          id: 'DBU8NjZSYO',
          type: 'header',
          data: {
            text: 'Editor.js',
            level: 2,
          },
        },
        {
          id: 'V5NrIvKAW3',
          type: 'paragraph',
          data: {
            text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.',
          },
        },
      ],
      version: '2.22.2',
    },
  },
}));

export const bigtestCreate = request(async () => ({ data: {} }));

export const bigtestUpdate = request(async () => ({ data: {} }));

export const bigtestDelete = request(async () => ({ data: {} }));
