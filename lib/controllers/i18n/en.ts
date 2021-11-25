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
      submit: 'Submit',
      remove: 'Remove',
      cancel: 'Cancel',

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
      rows_selected: 'row(s) selected',
      remove: 'Remove',
    },

    validation: {
      empty: 'This field cannot be empty',
      email: 'Wrong email format',
      password: 'Password cannot be shorter than 6 symbols',
    },
  },
};

export type TranslationSchema = typeof enLocale;
