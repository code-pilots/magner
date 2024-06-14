import type { TranslationSchema } from './en';

export const uzLocale: TranslationSchema = {
  core: {
    header: {
      logout: 'Чиқиш',
    },

    sidebar: {
      collapse: 'Бузиш',
    },

    messages: {
      error: 'Муаммо юзага келди.',
      not_found_title: 'Извините, такой  страницы не существует',
      not_found_disc: 'Возможно, вы ошиблись в адресе или страница была удалена.',
    },

    card: {
      remove: 'Ўчириш',
      success_creation: 'Яратиш муваффақиятли якунланди!',
      success_edition: 'Таҳрирлаш муваффақиятли амалга оширилди!',
      success_removal: 'Ўчириш муваффақиятли якунланди!',
      attention: 'Диққат!',
      removal_confirm: 'Ушбу"{msg}"ни ўчириб ташламоқчимисиз?',
      confirm_button_text: 'Ҳа',
      cancel_button_text: 'Бекор қилиш',
      add_more: 'Қўшиш',
    },

    form: {
      clear: 'Тозалаш',
      submit: 'Тасдиқлаш',
      remove: 'Ўчириш',
      cancel: 'Бекор қилиш',
      failed_action: 'Ҳаракатни амалга оширишни иложи бўлмади.',

      input_phone: {
        without_mask: 'Маскасиз',
      },
      select: {
        check_all: 'Барча танланг',
        clear: 'Тозалаш',
        ok: 'OK',
      },
      dropzone: {
        drag_here: 'Файлни шу ерга ташланг ёки',
        click_upload: 'юклаб олиш учун шу ерни босинг.',
        wrong_format: 'Файл нотўғри форматда {filename}',
        wrong_size: 'Файлнинг максимал ҳажми {мах} дан ошиб кетди. Максимал ҳажми:{мах}',
        max_files: 'Юкланган файлларнинг максимал сони: {мах}',
      },
    },

    table: {
      filters: 'Фильтрлар',
      more_filters: 'Барча фильтрлар',
      filters_applied: 'Фильтрлар қўлланилди',
      filters_submit: 'Фильтрларни қўллаш',
      rows_selected: '{cоунт} қатор танланди | {cоунт} қатор танланди | {cоунт} танланди строк',
      remove: 'Ўчириш',
      filters_close: 'Бекор қилиш',
    },

    validation: {
      empty: 'Майдон бўш бўла олмайди.',
      email: 'Электрон почта формати нотўғри',
      password: 'Парол 6 та белгидан кам бўлмаслиги керак',
    },

    modal: {
      before_close: 'Ҳақиқатан ҳам ойнани ёпмоқчимисиз?',
    },
  },
};
