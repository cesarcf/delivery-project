const path = require('path');
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
	entry: {
		vendor: [
			'axios',
			'classnames',
			'formik',
			'lodash',
			'moment',
			'normalizr',
			'react',
			'react-dom',
			'react-redux',
			'react-router-dom',
			'redux',
			'redux-thunk',
			'reselect',
			'yup'
		],

	},

	output:{
		path: path.join(__dirname, 'build'),
		filename: 'js/[name].[hash].js',
		library: '[name]'
	},

	plugins:[
		new webpack.DllPlugin({
			path: path.join(__dirname, '[name]-dll-manifest.json'),
			name: '[name]'
		}),

		new CompressionPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.(js|css|ttf|svg|eot)$/,
			threshold: 0,
			minRatio: 0.8,
		})

	]
}