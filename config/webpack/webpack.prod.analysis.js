// Webpack bundle analysis for page
const webpackMerge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackProdConfig = require('./webpack.prod.config');

module.exports = webpackMerge(webpackProdConfig, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 8890,
    }),
  ],
});
