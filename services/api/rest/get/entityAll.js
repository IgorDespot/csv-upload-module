const { entity }    = require('lib/orion-module-new');

exports = module.exports = function (req, res, next) {

  let service = req.headers['fiware-service'];
  let service_path = req.headers['fiware-servicepath'];

  entity.listEntitiesPromise(service, service_path).then(function (entities) {
    res.json(entities)
  }).catch((error) => {
    res.json(error)
  });
}