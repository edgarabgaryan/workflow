'use strict';

module.exports = {
    context: __dirname + "/app/src",
    entry: "./app",
    output: {
        path: __dirname + "/app/dist",
        filename: "build.js"
    }
}