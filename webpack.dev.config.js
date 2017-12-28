const path = require('path');
const webpackMerge = require('webpack-merge');
const { spawn } = require('child_process');
const webpackBaseConfig = require('./webpack.basic.config');

module.exports = webpackMerge(webpackBaseConfig, {
	entry: {
		app: [
			'webpack/hot/only-dev-server',
			'./app/index.jsx',
		],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: 'http://127.0.0.1:1112/',
	},
	cache: true,
	devServer: {
		compress: true,
		inline: true,
		lazy: false,
		contentBase: path.join(__dirname, 'build'),
		publicPath: 'http://localhost:1112/build',
		disableHostCheck: true, // do not use production
		historyApiFallback: true,
		hot: true,
		port: 1112,
		before() {
			console.log('Start Main Process...');
			spawn(
				'yarn',
				['dev'],
				{ shell: true, env: process.env, stdio: 'inherit' },
			)
				.on('close', code => process.exit(code))
				.on('error', spawnError => console.error(spawnError));
		},
	},
});