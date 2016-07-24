var webpack = require('webpack')

module.exports = function (config) { // eslint-disable-line
  config.set({
    preprocessors: {
      './test.webpack.js': ['webpack']
    },
    files: ['./test.webpack.js'],
    frameworks: ['mocha'],
    singleRun: true,
    colors: true,
    browsers: ['PhantomJS'],
    reporters: ['mocha', 'coverage'],
    logLevel: 'DEBUG',

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-mocha-reporter'),
      require('karma-phantomjs-launcher'),
      require('karma-sourcemap-loader'),
      require('karma-coverage')
    ],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: {limit: 10240} },
          { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
          { test: /\.json$/, loader: 'json-loader' },
          { test: /\.less$/, loader: 'style!css!less' },
          { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' },
          { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
          {test: /\.dust$/, loader: 'bby-dust'}
        ],
        postLoaders: [ {
          test: /\.js$/,
          exclude: /(test|node_modules|bower_components|__tests__)\//,
          loader: 'istanbul-instrumenter' } ]
      },
      resolve: {
        modulesDirectories: [
          'src',
          'node_modules'
        ],
        extensions: ['', '.json', '.js']
      },
      plugins: [
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __DEVTOOLS__: false
        })
      ]
    },

    webpackServer: {
      noInfo: false
    },

    coverageReporter: {
      type: 'html',
      dir: 'coverage'
    }

  })
}
