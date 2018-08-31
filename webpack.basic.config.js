const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    widget: './app/renderer/pages/webview/index.jsx',
    preloadScript: './app/renderer/pages/webview/preloadScript.js',
    preference: './app/renderer/pages/preference/index.jsx',
    search: './app/renderer/pages/search/index.jsx',
    updateWindow: './app/renderer/pages/update/UpdateWindow/index.jsx',
    updateProgress: './app/renderer/pages/update/UpdateProgress/index.jsx'
  },
  target: 'electron-renderer',
  module: {
    noParse: /ws\/lib/,
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, '/app'),
        ],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          'eslint-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.join(__dirname, 'app/renderer/scss', '**/_*.scss'),
              ],
            },
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|cur)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          publicPath: process.env.NODE_ENV === 'development' ? path.join(__dirname) : undefined,
          outputPath: process.env.NODE_ENV === 'development' ? '/' : undefined,
        },
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['widget'],
      filename: 'widget.html',
      template: path.join(__dirname, './app/renderer/pages/webview/widget.html'),
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      chunks: ['preference'],
      filename: 'preference.html',
      template: path.join(__dirname, './app/renderer/pages/preference/preference.html'),
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      chunks: ['search'],
      filename: 'search.html',
      template: path.join(__dirname, './app/renderer/pages/search/search.html'),
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      chunks: ['updateWindow'],
      filename: 'update_window.html',
      template: path.join(__dirname, './app/renderer/pages/update/UpdateWindow/update_window.html'),
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      chunks: ['updateProgress'],
      filename: 'update_progress.html',
      template: path.join(__dirname, './app/renderer/pages/update/UpdateProgress/update_progress.html'),
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        IS_DEVTOOLS: JSON.stringify(process.env.IS_DEVTOOLS),
      },
      '__DEV__': process.env.NODE_ENV === 'development',
      '__PROD__': process.env.NODE_ENV === 'production',
    }),
  ],
  resolve: {
    alias: {
      actions: path.resolve(__dirname, 'app/actions'),
      assets: path.resolve(__dirname, 'app/assets'),
      constants: path.resolve(__dirname, 'app/constants'),
      components: path.resolve(__dirname, 'app/components'),
      main: path.resolve(__dirname, 'app/main'),
      renderer: path.resolve(__dirname, 'app/renderer'),
      process: path.resolve(__dirname, 'app/process'),
      setting: path.resolve(__dirname, 'app/renderer/pages/setting'),
      webview: path.resolve(__dirname, 'app/renderer/pages/webview'),
      scss: path.resolve(__dirname, 'app/renderer/scss'),
      utils: path.resolve(__dirname, 'app/utils'),
      store: path.resolve(__dirname, 'app/store'),
    },
    extensions: ['.js', '.jsx'],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
};
