module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/typescript',
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  ignorePatterns: [
    'dist/**',
    'public/**',
    'docs/**',
    'node_modules/**',
    'cli/**',
  ],
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'vue/max-attributes-per-line': ['warn', {
          singleline: 3,
          multiline: 1,
        }],
        'vue/singleline-html-element-content-newline': 0,
      },
    },
  ],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'import/no-absolute-path': 0,
    'space-before-function-paren': [1, 'always'],
    'no-underscore-dangle': 0,
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'no-trailing-spaces': 0,
    'no-unused-vars': 0,
    'vue/prop-name-casing': 0,
    'vue/valid-v-model': 0,
    'vue/multi-word-component-names': 0,
    'lines-between-class-members': 0,
    'no-param-reassign': 0,
    'prefer-destructuring': 0,
    'max-len': [1, { code: 120 }],
    camelcase: 0,
  },
};
