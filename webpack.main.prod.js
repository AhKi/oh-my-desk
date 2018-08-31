const path = require('path');
const basic = require('./webpack.basic.config');

module.exports = {
  entry: './app/main.js',
  output: {
    filename: '[name].prod.js',
    path: path.resolve(__dirname, 'build'),
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
          },
          'eslint-loader',
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
