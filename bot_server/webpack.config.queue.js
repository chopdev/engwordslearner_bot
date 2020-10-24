const path = require('path');

module.exports = {
    entry: './lambda/reloadQueueLambda.js',
    output: {
        path: path.resolve(__dirname, 'dist/reloadQueue'),
        filename: 'index.js',
        libraryTarget: 'commonjs' // needed to include the handler https://stackoverflow.com/questions/47269383/webpack-and-aws-lambda-issue-handler-missing-on-module
    },
    target: "node",
    optimization: {
        minimize: false
    }
};