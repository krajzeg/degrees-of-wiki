import express from 'express';
import path from 'path';

module.exports = function challenges() {
  let app = express();

  app.set('views', path.join(process.cwd(), 'src/views'));

  app.get('/from/:from/to/:to', serveChallengePage);

  return app;

  function serveChallengePage(req, res) {
    res.render('challenge', {from: req.params.from, to: req.params.to});
  }
}
