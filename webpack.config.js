var path = require('path');

module.exports = {
  entry: "./front/js/main.js",
  devtool: 'source-map',
  output: {
    path: "dist/",
    filename: "bundle.js"
  },
  resolve: {
    root: [
      path.resolve('./front'),
      path.resolve('./node_modules')
    ]
  },
  module: {
    loaders: [
      // Babel for ES6 (and later React)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
};
