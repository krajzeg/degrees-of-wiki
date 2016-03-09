module.exports = function enableCors(origins) {
  return function(req, res, next) {
    res.set({
      'Access-Control-Allow-Origin': '*'
    });
    next();
  }
};