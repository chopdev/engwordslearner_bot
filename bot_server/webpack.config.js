const path = require('path');

module.exports = {
    entry: './lambda/mainTelegramLambda.js',
    output: {
        path: path.resolve(__dirname, 'dist/mainTelegramBot'),
        filename: 'index.js',
        libraryTarget: 'commonjs'
    },
    target: "node",
    optimization: {
        minimize: false
    }
};