const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'main.bundle.js'
	},
	watch: true,
	target: "web",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.css$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: {
							minimize: true
						}
					}, 'postcss-loader']
				}))
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader', // Translates CSS into CommonJS
						options: {
							minimize: true
						}
					}, {
						loader: 'sass-loader' // Compiles Sass to CSS
					}, {
						loader: 'postcss-loader' // Creates style nodes from JS strings
					}]
				})
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.bundle.js'
		}),
		new ExtractTextPlugin({
			filename: '[name].bundle.css',
			allChunks: true,
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: 'body'
		})
	],
	devServer: {
		port: 8081,
		contentBase: path.resolve(__dirname, 'src'),
		historyApiFallback: true,
		inline: true,
		open: true
	},
};
