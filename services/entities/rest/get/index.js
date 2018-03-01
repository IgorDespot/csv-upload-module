const all = require('lib/orion-module').listAll;

exports = module.exports = function(req, res, next) {
  all().then(function(entities) {
    res.send(entities)
  }).catch((error) => {
    res.send(error)
  });
}
