const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './app/page/setting/index.jsx',
    store: './app/store/index.js',
    widget: './app/page/webview/index.jsx',
  },
  target: 'electron-renderer',
  module: {
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
                path.join(__dirname, 'app/scss', '**/_*.scss'),
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
      chunks: ['app'],
      filename: 'index.html',
      template: path.join(__dirname, './app/page/setting/index.html'),
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      chunks: ['widget'],
      filename: 'widget.html',
      template: path.join(__dirname, './app/page/webview/index.html'),
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      '__DEV__': process.env.NODE_ENV === 'development',
      '__PROD__': process.env.NODE_ENV === 'production',
    }),
  ],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'app/assets'),
      constants: path.resolve(__dirname, 'app/constants'),
      components: path.resolve(__dirname, 'app/components'),
      page: path.resolve(__dirname, 'app/page'),
      setting: path.resolve(__dirname, 'app/page/setting'),
      webview: path.resolve(__dirname, 'app/page/webview'),
      scss: path.resolve(__dirname, 'app/scss'),
      utils: path.resolve(__dirname, 'app/utils'),
      store: path.resolve(__dirname, 'app/store'),
    },
    extensions: ['.js', '.jsx'],
  },
};
