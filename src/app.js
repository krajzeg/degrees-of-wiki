const express = require('express');
const goodGuy = require('good-guy-http')();
const path = require('path');
const onProduction = process.env.NODE_ENV == 'production';

// ==============================================================

let app = express();

// view setup
app.set('view engine', 'html');
app.engine('html', require('consolidate').handlebars);

// logging on development
if (!onProduction) {
  app.use('*', require('morgan')('dev'));
}

// static files
app.use('/dist', express.static("dist/"));

// challenges
app.use('/challenge', require('./routes/challenge')());
app.get('/', (req, res) => res.redirect('/challenge/from/Mother_Teresa/to/Pikachu'));

// API
app.use('/api', require('./middleware/enable-cors')());
app.use('/api/article', require('./routes/api/article')({goodGuy}));

// catch-all error handling
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
    console.error("While handling " + req.url + ":\n", err.stack || err);
  }
});

module.exports = app;
