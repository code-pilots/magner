import { request } from 'lib/index';

const editorData = JSON.stringify({
  time: 1636442791295,
  version: '2.22.2',
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
});

export const bigtestGet = request(async () => ({
  data: {
    phone: '79203122255',
    textarea: 'Hello, my dear friends. Today we are going to learn the basics of the spring theory. This is the one of the most interesting topic of the entire physics!',
    country: 'India',
    radio: 'Adult',
    checkbox: ['all', 'child'],
    datetime1: '2021-11-18 00:00:00',
    editor1: editorData,
  },
}));

export const bigtestCreate = request(async () => ({ data: {} }));

export const bigtestUpdate = request(async () => ({ data: {} }));

export const bigtestDelete = request(async () => ({ data: {} }));
