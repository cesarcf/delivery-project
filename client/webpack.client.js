const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')



module.exports = env => {
	const IS_DEVELOPMENT = (env === 'development') ? true : false
	const ifDev = (then) => (IS_DEVELOPMENT ? then : null)
	const ifProd = (then) => (!IS_DEVELOPMENT ? then : null)
	const falsy = (i) => i


	const clientConfig = {
		target: 'web',

		entry: [
			'babel-polyfill',
			ifDev('react-hot-loader/patch'),
			'./client.js'
		].filter(falsy),


		output: {
			filename: IS_DEVELOPMENT ? 'js/[name].js' : 'js/[name].[hash].js',
			path: path.resolve(__dirname, 'build'),
			publicPath: '/'
		},

		devServer: {
			contentBase: [path.resolve(__dirname, 'build')],
			publicPath: '/',
			host: 'localhost',
			port: 3000,
			hot: true,
			historyApiFallback: true,
			compress: true,
			headers: {},
			proxy:{
				"/auth/*": "http://localhost:5000",
				"/user/*": "http://localhost:5000",
				"/orders/*": "http://localhost:5000",
				"/shipments/*": "http://localhost:5000",
				"/countries/*": "http://localhost:5000",
				"/addresses/*": "http://localhost:5000",
				"/socket.io/*": {
					"target": "http://localhost:5000",
					"ws": true
				}

			}
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
							'react',
							['env',
								{
									modules: false,
									targets: { browsers: ['last 2 versions'] }
								}
							],
							'stage-0'
						],
						//Plugins va dentro de options
						plugins: [
							ifDev('react-hot-loader/babel')
						].filter(falsy)

					}
				},//fin JS|JSX|babel

				/////////////////// HTML FILES ///////////////////
				{
					test: /\.html$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'html-loader',
							options: {
								// minimize: true,
								// removeComments: false,
								// collapseWhitespace: false
							}
						}
					]
				},

				/////////////////// CSS - STYLUS ///////////////////
				{
					test: /\.styl$/,
					use: IS_DEVELOPMENT ? (
						/////development /////
						[
							{
								loader: 'style-loader'
							},
							{
								loader: 'css-loader',
								options:{
									importLoaders:1,
									/* If we want to activate CSSModule */
									//modules: true,
									//localIdentName: '[name]--[local]--[hash:base64:5]' //class='componente--clase--2f554'
								}
							},
							{
								loader: 'stylus-loader',
								options: {
									use: [
										require('nib')
									],
									import:[
										'~nib/lib/nib/index.styl'
									]
								}
							}
						]
					) : (
						/////Production /////
						ExtractTextPlugin.extract({
							//publicPath: '',//Override the publicPath setting for this loader
							fallback: { loader: 'style-loader' },
							use: [
								{
									loader: 'css-loader',
									options: {
										sourceMap: IS_DEVELOPMENT,
										importLoaders:1,
										//modules:true,
										//localIdentName: '[name]--[local]--[hash:base64:5]', //class='componente--clase--2f554'
										minimize: IS_DEVELOPMENT ? false : { discardComments: { removeAll: true } } // "cssnano" esta incluido en en 'css-loader'
									}
								},

								{
									loader: 'stylus-loader',
									options: {
										sourceMap: IS_DEVELOPMENT,
										use: [
											require('nib')
										],
										import:[
											'~nib/lib/nib/index.styl'
										]
									}
								}
							]
						})//end ExtractTextPlugin

					)

				},//end CSS - STYLUS


				/////////////////// IMAGENES ///////////////////
				{
					test: /\.(gif|png|jpe?g)$/,
					use: {
						loader: 'url-loader',
						options: {
							limit: 10000,
							fallback: 'file-loader',//file-loader outputs image files and returns paths to them instead of inlining
							name: 'images/[name].[hash].[ext]',//[name].[hash].[ext] = imagen.no23rjh2r5jh2jh2.jpg
						}
					}
				},

				/////////////////// SOURCES ///////////////////
				{
					test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 600000,
								fallback: 'file-loader',//file-loader outputs image files and returns paths to them instead of inlining
								name: 'images/[name].[hash].[ext]',//[name].[hash].[ext] = imagen.no23rjh2r5jh2jh2.jpg
							}
						}
					]
				}

			]//end Rules
		},//end Module



		plugins:[
			new webpack.DllReferencePlugin({
				manifest: require('./vendor-dll-manifest.json')
			}),

			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
				'HOST_DEVELOPMENT': JSON.stringify('http://localhost:5000'),
				'HOST_PRODUCTION': JSON.stringify('https://saloodo.com')
			}),

			new HtmlWebpackPlugin({
				template: './index.html',
				inject: true,
				minify: {
					removeComments: IS_DEVELOPMENT ? false : true,
					collapseWhitespace: IS_DEVELOPMENT ? false : true,
					// removeRedundantAttributes: true,
					// useShortDoctype: true,
					// removeEmptyAttributes: true,
					// removeStyleLinkTypeAttributes: true,
					// keepClosingSlash: true,
					// minifyJS: true,
					// minifyCSS: true,
					// minifyURLs: true,
				}
			}),

			ifDev(new FriendlyErrorsWebpackPlugin()),
			ifProd(new CleanWebpackPlugin(['build'], { root: __dirname })),
			ifProd(new ExtractTextPlugin('css/[name].[contenthash].css')),

			new CompressionPlugin({
				asset: '[path].gz[query]',
				algorithm: 'gzip',
				test: /\.(js|css|ttf|svg|eot)$/,
				threshold: 0,
				minRatio: 0.8,
			}),

			//////////////// Hot Module Replacement ///////////////////////
			ifDev(new webpack.NamedModulesPlugin()),//Prints more readable module names in the browser console on HMR updates
			ifDev(new webpack.HotModuleReplacementPlugin()),//Activa HMR
			ifDev(new webpack.NoEmitOnErrorsPlugin())//do not emit compiled assets that include errors
		].filter(falsy)

	}

	return merge(baseConfig, clientConfig)
};
