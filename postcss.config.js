module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-custom-media': {
      importFrom: './lib/assets/styles/breakpoints.css',
    },
    'postcss-nested': {},
  },
};
