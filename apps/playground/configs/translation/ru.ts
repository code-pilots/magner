import type { CustomTranslationSchema } from './en';

const ruCustom: CustomTranslationSchema = {
  pages: {
    home: 'Домашняя',
    patient: 'Пациент',
    post: 'Публикация',
    posts: 'Публикации',
    nested: 'Вложенность',
    form_test: 'Тест формы',
    form_layout: 'Пример разметки',
  },
  login: {
    title: 'Вход',
    submitButton: 'Войти',
    fields: {
      email_placeholder: 'Е-мейл',
      password_placeholder: 'Пароль',
    },
  },
  post: {
    new_post: 'Новая публикация',
    form_title: 'Публикация',
    submit: 'Сохранить',
    remove: 'Удалить',
    clear: 'Очистить',
    cancel: 'Отменить',
    name_input: 'Название',
    likes_input: 'Лайки',
    dropzone_input: 'Обложка',
    tags_input: 'Тэги',
    owner_input: 'Автор',
    tags_1: 'Горячее',
    tags_2: 'Погода',
    tags_3: 'Спорт',
    tags_4: 'Политика',
    tags_5: 'Что-то еще',
  },
  posts: {
    not_found: 'Публикации не найдены',
    create_in_modal: 'Создать в модальном окне',
    failed_creation: 'Не удалось создать публикацию',
    remove_selected: 'Удалить выделенное',
  },
  form_test: {
    title: 'Тест формы',
    submit_text: 'Сохранить',
    error: 'Ошибка формы',
    form: {
      example_label: 'Пример',
      layout_text: 'Делайте со структурой что хотите!',
      custom_layout: 'Это полностью кастомный блок!',
      dropzone_label: 'Пример дропзоны',
    },
  },
  home: {
    hello: 'Привет из универсальной админки!',
  },
};

export default ruCustom;
