const webpackMerge = require('webpack-merge');
const { spawn } = require('child_process');
const webpackBaseConfig = require('./webpack.basic.config');
const { BUILD_PATH } = require('../path');

module.exports = webpackMerge(webpackBaseConfig, {
  output: {
    filename: '[name].js',
    path: BUILD_PATH,
    publicPath: 'http://127.0.0.1:1112/',
  },
  cache: true,
  mode: 'development',
  devServer: {
    compress: true,
    inline: true,
    lazy: false,
    contentBase: BUILD_PATH,
    publicPath: 'http://localhost:1112/build',
    disableHostCheck: true, // do not use production
    historyApiFallback: true,
    hot: true,
    port: 1112,
    before() {
      console.log('Start Main Process...');
      spawn(
        'yarn watch:main',
        { shell: true, env: process.env, stdio: 'inherit' },
      )
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
    },
  },
});
