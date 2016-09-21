module.exports = { // eslint-disable-line
  devtool: 'eval-source-map',
  entry: {
    main: './src/main.js'
  },
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
