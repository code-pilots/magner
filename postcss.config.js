module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-custom-media': {
      importFrom: './src/core/assets/styles/breakpoints.css',
    },
    'postcss-nested': {},
  },
};
