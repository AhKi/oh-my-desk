const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { APP_PATH, ROOT_PATH, CONFIG_PATH } = require('../path');

module.exports = {
  entry: {
    widget: path.join(APP_PATH, 'renderer/pages/widget/index.jsx'),
    preloadScript: path.join(APP_PATH, 'renderer/pages/widget/preloadScript.js'),
    preference: path.join(APP_PATH, 'renderer/pages/preference/index.jsx'),
    search: path.join(APP_PATH, 'renderer/pages/search/index.jsx'),
  },
  target: 'electron-renderer',
  module: {
    noParse: /ws\/lib/,
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          APP_PATH,
        ],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.join(CONFIG_PATH, 'babel/babel.config.js'),
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              configFile: path.join(CONFIG_PATH, '.eslintrc'),
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.join(APP_PATH, 'renderer/scss', '**/_*.scss'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|cur)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          publicPath: process.env.NODE_ENV === 'development' ? ROOT_PATH : undefined,
          outputPath: process.env.NODE_ENV === 'development' ? '/' : undefined,
        },
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['widget'],
      filename: 'widget.html',
      template: path.join(APP_PATH, 'renderer/pages/widget/widget.html'),
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      chunks: ['preference'],
      filename: 'preference.html',
      template: path.join(APP_PATH, 'renderer/pages/preference/preference.html'),
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      chunks: ['search'],
      filename: 'search.html',
      template: path.join(APP_PATH, 'renderer/pages/search/search.html'),
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        IS_DEVTOOLS: JSON.stringify(process.env.IS_DEVTOOLS),
      },
    }),
  ],
  resolve: {
    alias: {
      actions: `${APP_PATH}/actions`,
      assets: `${APP_PATH}/assets`,
      config: `${APP_PATH}/config`,
      constants: `${APP_PATH}/constants`,
      components: `${APP_PATH}/components`,
      main: `${APP_PATH}/main`,
      renderer: `${APP_PATH}/renderer`,
      process: `${APP_PATH}/process`,
      setting: `${APP_PATH}/setting`,
      widget: `${APP_PATH}/pages/widget`,
      scss: `${APP_PATH}/renderer/scss`,
      utils: `${APP_PATH}/utils`,
      store: `${APP_PATH}/store`,
    },
    extensions: ['.js', '.jsx'],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
};
