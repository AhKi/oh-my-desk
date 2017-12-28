const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.basic.config');

module.exports = webpackMerge(webpackBaseConfig, {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: './',
  },
});