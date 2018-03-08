const getAll = require('lib/orion-module-new').listEntities;

exports = module.exports = function(req, res, next) {

  getAll().then(function(entities) {
   res.json(entities)
  }).catch((error) => {
    res.json(error)
  });
}
