var express = require('express');
var goodGuy = require('good-guy-http')();

var onProduction = process.env.NODE_ENV == 'production';

// ==============================================================

var app = express();

if (!onProduction) {
  app.use('*', require('morgan')('dev'));
}
app.use('/api', require('./middleware/enable-cors')());
app.use('/api/article', require('./routes/api/article')({goodGuy}));

app.use('/', express.static("dist/"));
app.use('/', express.static("front/"));

// Error handler
app.use('*', function(err, req, res, next) {
  if (!err) {
    err = {status: 404, message: "Not found."};
  }

  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    res.status(500);
    if (process.env.NODE_ENV == 'production') {
      res.send("Internal server error.");
    } else {
      res.send(err.stack || err);
    }
  }
});

module.exports = app;
