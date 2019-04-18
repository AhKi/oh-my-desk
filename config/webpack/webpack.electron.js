// Webpack config for Electron main.js
const basic = require('./webpack.basic.config');

const { APP_PATH, BUILD_PATH, CONFIG_PATH } = require('../path');

module.exports = {
  entry: `${APP_PATH}/main.js`,
  output: {
    filename: '[name].prod.js',
    path: BUILD_PATH,
    publicPath: '.',
  },
  module: {
    noParse: /ws\/lib/,
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: `${CONFIG_PATH}/babel/babel.config.js`,
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              configFile: `${CONFIG_PATH}/.eslintrc`,
            },
          },
        ],
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            outputPath: 'build',
          },
        }],
      },
    ],
  },
  target: 'electron-main',
  mode: 'production',
  resolve: {
    alias: basic.resolve.alias,
  },
  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false,
  },
};
