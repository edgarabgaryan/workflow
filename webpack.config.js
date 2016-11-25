'use strict';

var path = require('path');

module.exports = {
    context: path.resolve(__dirname + "/app/src"),
    entry: "./app",
    output: {
        path: path.resolve(__dirname + "/app/dist"),
        filename: "build.js"
    },

    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    }
};