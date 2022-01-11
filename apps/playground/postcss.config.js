module.exports = {
  plugins: {
    'postcss-import': {},
    autoprefixer: {},
    'postcss-custom-media': {
      importFrom: './src/assets/styles/breakpoints.css',
    },
    'postcss-nested': {},
  },
};
