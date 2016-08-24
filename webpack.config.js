/**
 * Created by vnguyen on 8/24/16.
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loaders: [
                    'file?name=assets/[name].[hash].[ext]',
                    'image-webpack'
                ]
            }, {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/index.html'
        })
    ]
}