import type { TranslationSchema } from 'core/controllers/i18n/en';

const ruLocale: TranslationSchema = {
  core: {
    header: {
      logout: 'Выйти',
    },
    sidebar: {
      collapse: 'Свернуть',
    },
    card: {
      remove: 'Удалить',
      success_creation: 'Создание прошло успешно!',
      success_removal: 'Удаление прошло успешно!',
      attention: 'Внимание!',
      removal_confirm: 'Вы уверены, что хотите удалить "{msg}"?',
      confirm_button_text: 'Да',
      cancel_button_text: 'Отмена',
      add_more: 'Добавить',
    },
    form: {
      clear: 'Очистить',
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
      more_filters: 'Больше фильтров',
      filters_applied: 'Применено фильтров',
    },
  },
};

export default ruLocale;
