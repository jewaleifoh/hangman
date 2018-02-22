var path = require('path');
var webpack = require('webpack');

module.exports = {


	entry: './src/app.js',
	output: {

			path: path.resolve(__dirname, 'js'),
			filename: 'app.js'
	},
	module: {

		rules : [

			{test: /\.js$/, use: 'babel-loader'}
		]
	},
	stats: {

		colors: true
	},
	devtool: 'source-map'
};