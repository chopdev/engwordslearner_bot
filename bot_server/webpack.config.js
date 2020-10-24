const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    //mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'test.js'
    },
    externals: [nodeExternals()],
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
    },
/*     plugins: [
      new webpack.ProvidePlugin({
        identifier: "babel/plugin-syntax-class-properties",
      })
    ] */
};

/* module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'test.js'
    },
    // target: ['node12.16'],
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
    } 
}; */