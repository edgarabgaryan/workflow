'use strict';

var webpack = require('webpack');
var path = require('path');

var NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    context: path.resolve(__dirname + "/app/src"),
    entry: "./app",
    output: {
        path: path.resolve(__dirname + "/app/dist"),
        filename: "build.js"
    },

    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? "eval" : null,

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
        }),
    ],

    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'html'
            },
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