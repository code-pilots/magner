module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-custom-media': {
      importFrom: './src/settings/assets/styles/breakpoints.css',
    },
    'postcss-nested': {},
  },
};
