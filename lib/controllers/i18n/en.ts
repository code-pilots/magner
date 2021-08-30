export const enLocale = {
  core: {
    header: {
      logout: 'Log out',
    },
    sidebar: {
      collapse: 'Collapse',
    },
    card: {
      remove: 'Remove',
      success_creation: 'Created successfully!',
      success_removal: 'Removed successfully!',
      attention: 'Attention!',
      removal_confirm: 'Are you sure you want to delete "{msg}"?',
      confirm_button_text: 'Yes',
      cancel_button_text: 'Cancel',
      add_more: 'Add more',
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
