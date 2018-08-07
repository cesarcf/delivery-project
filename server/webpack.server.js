const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const webpackNodeExternals = require('webpack-node-externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')


module.exports = env => {
	const IS_DEVELOPMENT = (env === 'development') ? true : false
	const ifDev = (then) => (IS_DEVELOPMENT ? then : null)
	const ifProd = (then) => (!IS_DEVELOPMENT ? then : null)
	const falsy = (i) => i


	const serverConfig = {
		target: 'node',

		node:{
			__dirname: true
		},

		entry: [
			'babel-polyfill',
			'./server.js'
		],

		output: {
			filename: IS_DEVELOPMENT ? 'dev.js' : 'prod.js',
			path: path.resolve(__dirname, 'build')
		},

		devtool: IS_DEVELOPMENT ? 'eval' : false,

		module: {

			rules:[
				/////////////////// JS|JSX|BABEL ///////////////////
				{
					test: /\.jsx?$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					options: {
						presets: [
							['env',
								{
									modules: false,
									targets: { browsers: ['last 2 versions'] }
								}
							],
							'stage-0'
						]
					}
				},

				{
					test: /\.(html)$/,
					use: {
						loader: 'html-loader',
					}
				}
			]
		},

		externals: [webpackNodeExternals()],


		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}),
			ifProd(new CleanWebpackPlugin(['build'], { root: __dirname }))
		].filter(falsy)

	}

	return merge(baseConfig, serverConfig)
}