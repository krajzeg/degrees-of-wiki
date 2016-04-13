const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');

module.exports = function webpackMiddleware() {
  const config = require(path.join(process.cwd(), 'webpack.config.js'));
  const compiler = webpack(config);

  let app = express();
  app.use(webpackDev(compiler, {
    publicPath: '/dist/'
  }));
  app.use(webpackHot(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
  return app;
}
