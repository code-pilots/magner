import type { TranslationSchema } from './en';

export const ruLocale: TranslationSchema = {
  core: {
    header: {
      logout: 'Выйти',
    },

    sidebar: {
      collapse: 'Свернуть',
    },

    messages: {
      error: 'Произошла ошибка',
    },

    card: {
      remove: 'Удалить',
      success_creation: 'Создание прошло успешно!',
      success_edition: 'Изменение прошло успешно!',
      success_removal: 'Удаление прошло успешно!',
      attention: 'Внимание!',
      removal_confirm: 'Вы уверены, что хотите удалить "{msg}"?',
      confirm_button_text: 'Да',
      cancel_button_text: 'Отмена',
      add_more: 'Добавить',
    },

    form: {
      clear: 'Очистить',
      submit: 'Подтвердить',
      remove: 'Удалить',
      cancel: 'Отменить',
      failed_action: 'Не удалось выполнить действие',

      dropzone: {
        drag_here: 'Перетащите файлы сюда или',
        click_upload: 'нажмите для загрузки',
        wrong_format: 'Неправильный формат файла {filename}',
        wrong_size: 'Превышен максимальный размер файла {filename}. Максимум: {size} МБ',
        max_files: 'Mаксимальное количество загружаемых файлов: {max}',
      },
    },

    table: {
      filters: 'Фильтры',
      more_filters: 'Все фильтры',
      filters_applied: 'Применено фильтров',
      filters_submit: 'Применить фильтры',
      rows_selected: 'строк выбрано',
      remove: 'Удалить',
    },

    validation: {
      empty: 'Поле не может быть пустым',
      email: 'Неверный формат емейл',
      password: 'Пароль не может быть короче 6 символов',
    },

    modal: {
      before_close: 'Вы уверены, что хотите закрыть окно?',
    },
  },
};
