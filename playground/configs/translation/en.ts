const enCustom = {
  pages: {
    home: 'Home',
    patient: 'Patient',
    posts: 'Posts',
    post: 'Post',
    nested: 'Nested',
    form_test: 'Form test',
    form_layout: 'Layout example',
  },
  login: {
    title: 'Log In',
    submitButton: 'Log in',
    fields: {
      email_placeholder: 'E-mail',
      password_placeholder: 'Password',
    },
  },
  post: {
    new_post: 'New post',
    form_title: 'Post',
    submit: 'Submit',
    remove: 'Delete',
    clear: 'Clear',
    cancel: 'Cancel',
    name_input: 'Name',
    likes_input: 'Likes',
    dropzone_input: 'Cover image',
    tags_input: 'Tags',
    owner_input: 'Author',
    tags_1: 'Hot',
    tags_2: 'Weather',
    tags_3: 'Sports',
    tags_4: 'Politics',
    tags_5: 'Something',
  },
  posts: {
    not_found: 'No posts found',
  },
  form_test: {
    title: 'Form test',
    submit_text: 'Save',
    error: 'Form error',
    form: {
      example_label: 'Example',
      layout_text: 'You can do anything with this layout!',
      custom_layout: 'I am fully custom!',
      dropzone_label: 'Dropzone example',
    },
  },
  home: {
    hello: 'Hello from the universal admin!',
  },
};

/** !Don't change this! */
export type CustomTranslationSchema = typeof enCustom;
export default enCustom;
