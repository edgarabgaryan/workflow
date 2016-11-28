'use strict';

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var NODE_ENV = process.env.NODE_ENV || 'development';
var cssLoaders = 'css!autoprefixer?browsers=last 5 versions';

function addHash(template, hash) {
    return NODE_ENV == 'production' ?
        template.replace(/\.[^.]+$/, '.[' + hash + ']$&') :
        template + '?hash=[' + hash + ']';
}

module.exports = {
    context: path.resolve(__dirname + "/app/src"),
    entry: "./app",
    output: {
        path: path.resolve(__dirname + "/app/public/assets"),
        publicPath: 'assets',
        filename: addHash("build.js", 'hash'),
    },

    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? "eval" : null,

    plugins: [
        new ExtractTextPlugin(
            addHash('styles.css', 'contenthash'),
            {
                allChunks: true,
                disable: NODE_ENV == 'development',
            }
        ),
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
                loader: ExtractTextPlugin.extract('style', cssLoaders, {publicPath: './'}),
            }, {
                test: /\.styl/,
                loader: ExtractTextPlugin.extract('style', cssLoaders + '!stylus?resolve url', {publicPath: './'}),
            }, {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: addHash('file?name=[path][name].[ext]', 'hash:6'),
            },
        ],

        noParse: [
            /angular[\\|\/]angular.js/,
        ],
    },

    devServer: {
        host: 'localhost',
        port: 8080,
        contentBase: path.resolve(__dirname + "/app/public/"),
        // historyApiFallback: {
        //     index: './',
        // },
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