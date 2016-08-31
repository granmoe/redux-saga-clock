/* global module, __dirname */

// need to put this in package.json as a command:
// ./node_modules/webpack/bin/webpack.js

const Webpack = require('webpack')
const path = require('path')

require('file-loader')

const IS_DEV = process.env.NODE_ENV === 'development'

const definePlugin = new Webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': IS_DEV ? JSON.stringify('development') : JSON.stringify('production')
  }
})

module.exports = { // eslint-disable-line
  devtool: 'eval-source-map',
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    definePlugin,
  ],
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  module: {
    noParse: [
      /sinon\//
    ],
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }, {
        test: /\.less$/,
        loaders: ['style', 'css', 'less']
      }, {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /bootstrap\/js\//,
        loader: 'imports?jQuery=jquery'
      }, {
        test: /\.png$/,
        loader: 'file'
      }, {
        test: /\.gif$/,
        loader: 'file'
      }, {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      }
    ]
  }
}
