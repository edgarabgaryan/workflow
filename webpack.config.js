'use strict';

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var NODE_ENV = process.env.NODE_ENV || 'development';
var cssLoaders = 'css!autoprefixer?browsers=last 5 versions';

module.exports = {
    context: path.resolve(__dirname + "/app/src"),
    entry: "./app",
    output: {
        path: path.resolve(__dirname + "/app/public/assets"),
        publicPath: './assets/',
        filename: "build.js"
    },

    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? "eval" : null,

    plugins: [
        new ExtractTextPlugin('styles.css', {allChunks: true}),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
        }),
    ],

    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'html',
            }, {
                test: /\.css/,
                loader: ExtractTextPlugin.extract(cssLoaders, {publicPath: './'}),
            }, {
                test: /\.styl/,
                loader: ExtractTextPlugin.extract(cssLoaders + '!stylus?resolve url', {publicPath: './'}),
            }, {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'file?name=[path][name].[ext]',
            },
        ],

        noParse: [
            /angular[\\|\/]angular.js/,
        ],
    },
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings:       false,
                drop_console:   true,
                unsafe:         true,
            },
        })
    );
}