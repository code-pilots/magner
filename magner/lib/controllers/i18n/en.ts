export const enLocale = {
  core: {
    header: {
      logout: 'Log out',
    },

    sidebar: {
      collapse: 'Collapse',
    },

    messages: {
      error: 'An error happened',
      not_found_title: 'Sorry, there is no such page',
      not_found_disc: 'You may have been wrong in the address or the page has been deleted.',
    },

    card: {
      remove: 'Remove',
      success_creation: 'Created successfully!',
      success_edition: 'Edited successfully!',
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
      failed_action: 'Failed in performing the action',

      input_phone: {
        without_mask: 'Without Mask',
      },
      select: {
        check_all: 'Select all',
        clear: 'Clear',
        ok: 'OK',
      },
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
      filters_submit: 'Apply filters',
      rows_selected: 'One row selected | {count} rows selected',
      remove: 'Remove',
      filters_close: 'Close',
    },

    validation: {
      empty: 'This field cannot be empty',
      email: 'Wrong email format',
      password: 'Password cannot be shorter than 6 symbols',
    },

    modal: {
      before_close: 'Are you sure you want to close this window?"',
    },
  },
};

export type TranslationSchema = typeof enLocale;
