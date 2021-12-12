const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

/**
 * For each bundle with there will be two files created under /bundles/static:
 *  - /html/[bundle].html
 *  - /js/[bundle].js
 */
const bundles = {
	'byline': {
		title: 'Page byline',
		entryPoint: './byline/js/index.js',
		htmlTemplate: 'react-template.html',
	},
	'similarPages': {
		title: 'Similar pages',
		entryPoint: './similarPages/js/index.js',
		htmlTemplate: 'react-template.html',
	},
	'spaceOverview': {
		title: 'Space overview',
		entryPoint: './spaceOverview/js/index.js',
		htmlTemplate: 'react-template.html',
	}
};

const configs = Object.keys(bundles).map(bundle => {
	return {
		context: path.join(__dirname, '/frontend'),
		entry: {
			[bundle]: bundles[bundle].entryPoint,
		},
		output: {
			path: path.join(__dirname, `/build/${bundle}`),
			filename: `./js/[name].js`,
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
					},
				},
				{
					test: /\.(css|scss|sass)$/,
					use: [
						// Creates `style` nodes from JS strings
						'style-loader',
						// Translates CSS into CommonJS
						'css-loader',
						// Compiles Sass to CSS
						'sass-loader',
					],
				},
			],
		},
		resolve: {
			extensions: ['.js', '.jsx'],
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: bundles[bundle].title,
				inject: true,
				scriptLoading: 'defer',
				template: `./${bundles[bundle].htmlTemplate}`,
				filename: `./index.html`,
			}),
			new webpack.DefinePlugin({
				'process.env.ANALYTICS_NEXT_MODERN_CONTEXT': false,
			}),
		],
	};
});

module.exports = (env, options) => {
	configs.forEach(config => {
		if (options.mode === 'production') {
		} else {
			config.devtool = 'source-map';
		}
	});

	return configs;
};
