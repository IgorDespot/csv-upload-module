const getAll = require('lib/orion-module-new').listEntities;

exports = module.exports = function(req, res, next) {
  let service = req.headers['fiware-service'];
  let service_path = req.headers['fiware-servicepath'];

  getAll(service, service_path).then(function(entities) {
   res.json(entities)
  }).catch((error) => {
    res.json(error)
  });
}
