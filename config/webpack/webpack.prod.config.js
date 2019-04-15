const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.basic.config');
const { BUILD_PATH } = require('../path');

module.exports = webpackMerge(webpackBaseConfig, {
  output: {
    filename: '[name].js',
    path: BUILD_PATH,
    publicPath: './',
  },
  mode: 'production',
});
