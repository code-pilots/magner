import type { TranslationSchema } from './en';

/**
 * For pluralization in Russian, use i18n templates as '1 яблоко | 2 яблока | 5 яблок'.
 */
export const ruPluralization = (choice: number) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return (choice % 100 > 4 && choice % 100 < 20) ? 2 : cases[(choice % 10 < 5) ? choice % 10 : 5];
};

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
      not_found_title: 'Извините, такой  страницы не существует',
      not_found_disc: 'Возможно, вы ошиблись в адресе или страница была удалена.',
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
      rows_selected: 'Выбрана {count} строка | Выбрано {count} строки | Выбрано {count} строк',
      remove: 'Удалить',
      filters_close: 'Закрыть',
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
