const enLocale = {
  core: {
    header: {
      logout: 'Log out',
    },
    sidebar: {
      collapse: 'Collapse',
    },
    card: {
      remove: 'Remove',
    },
    form: {
      clear: 'Clear',
      dropzone: {
        drag_here: 'Drag file here or',
        click_upload: 'click for upload',
        wrong_format: 'Wrong format for file {filename}',
        wrong_size: 'Maximal size exceeded for file {filename}. Max: {size} MB',
        max_files: 'Maximal files amount is {max}',
      },
    },
    table: {
      filters: 'Filters',
      more_filters: 'All filters',
      filters_applied: 'Filters applied',
    },
  },
};

export type TranslationSchema = typeof enLocale;

export default enLocale;
