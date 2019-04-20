// Webpack bundle analysis for electron
const webpackMerge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackElectronConfig = require('./webpack.electron');

module.exports = webpackMerge(webpackElectronConfig, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 8889,
    }),
  ],
});
