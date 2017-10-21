const path = require('path');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.bundle.js'
    },
    watch:true,
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
                use: [ 'css-hot-loader' ].concat(ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [ {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }, 'postcss-loader' ]
                }))
            },
            {
                test: /\.scss$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [ {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }, {
                        loader: 'postcss-loader' // creates style nodes from JS strings
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
        // new webpack.optimize.UglifyJsPlugin({
        //     beautify: true,
        //     comments: false
        // }),
        new ExtractTextWebpackPlugin({
            filename: '[name].bundle.css'
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'My Awesome application',
            template: './index.html',
            myPageHeader: 'Hello World',
            inject: 'body',
            filename: './index.html' //relative to root of the application
        })
    ],
};
