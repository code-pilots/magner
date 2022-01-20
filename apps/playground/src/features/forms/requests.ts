import { request } from '~/utils/request';

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

export const bigtestGet = request.custom(async () => ({
  data: {
    phone: '79203122255',
    textarea: 'Hello, my dear friends. Today we are going to learn the basics of the spring theory. This is the one of the most interesting topic of the entire physics!',
    country: 'India',
    radio: 'Adult',
    checkbox: ['all', 'child'],
    datetime1: '2021-11-18 00:00:00',
    editor1: editorData,
    photo: ['https://images.unsplash.com/photo-1637009753940-f1d9460a388e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=776&q=80.jpg', 'https://images.unsplash.com/photo-1637002058121-7f3fde498f16?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80'],
    people: [
      {
        firstname: 'Ivan',
        lastname: 'Ivanov',
      },
    ],
  },
}));

export const bigtestCreate = request.custom(async () => ({ data: {} }));

export const bigtestUpdate = request.custom(async () => ({ data: {} }));

export const bigtestDelete = request.custom(async () => ({ data: {} }));
