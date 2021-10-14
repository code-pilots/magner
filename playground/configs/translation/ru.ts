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
    form_title: 'Публикация',
    submit: 'Сохранить',
    remove: 'Удалить',
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
  patients: {
    filters: {
      create_new: 'Создать',
      submit: 'Подтвердить',
      fullname_placeholder: 'Полное имя',
      sort_placeholder: 'Пример селекта',
      sort_alphabetical: 'В алфавитном порядке по имени',
      sort_alphabetical_reverse: 'В обратном алфавитном порядке по имени',
    },
    table: {
      not_found: 'Пациенты не найдены',
      id: 'ID',
      fullname: 'Полное имя',
      gender: 'Пол',
      email: 'Е-мейл',
      address: 'Адрес',
      apartments: 'Квартира',
      latitude: 'Широта',
      longitude: 'Долгота',
    },
  },
  form_test: {
    title: 'Тест формы',
    submit_text: 'Сохранить',
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
