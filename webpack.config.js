const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'src/dist'),
		filename: 'main.bundle.js'
	},
	watch: true,
	target: 'web',
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
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: ['file-loader?context=src/assets/icons/[path][name].[ext]', {  // images loader
					loader: 'image-webpack-loader',
					query: {
						mozjpeg: {
							progressive: true,
						},
						gifsicle: {
							interlaced: false,
						},
						optipng: {
							optimizationLevel: 4,
						},
						pngquant: {
							quality: '75-90',
							speed: 3,
						},
					},
				}],
				exclude: /node_modules/,
				include: __dirname,
			},
			{
				test: /\.svg/,
				use: {
					loader: 'svg-url-loader',
					options: {}
				}
			},
			{
				test: /\.(eot|ttf|otf|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]',
				}
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
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: 'body'
		}),
		new DashboardPlugin()
	],
	devServer: {
		port: 8081,
		contentBase: path.resolve(__dirname, 'src'),
		historyApiFallback: true,
		inline: true,
		open: true
	}
};
