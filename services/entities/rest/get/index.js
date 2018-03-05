const all = require('lib/orion-module').listAll;
const getAll = require('lib/orion-module-new');

exports = module.exports = function(req, res, next) {
  getAll().then(function(entities) {
    res.send(entities)
  }).catch((error) => {
    res.send(error)
  });
}
