module.exports = {
  linters: {
    '**/*.{js,jsx}': 'eslint --config ./config/.eslintrc',
  },
  ignore: ['**/*.config.js'],
};
