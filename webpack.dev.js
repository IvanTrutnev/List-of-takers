const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		hot: true
	},
	plugins: [ new webpack.HotModuleReplacementPlugin() ],
	module: {
		rules: [
			{
			  test: /\.css$/i,
			  use: ['style-loader', 'css-loader'],
			},
		  ],
	}
});
