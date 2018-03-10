const { entity }    = require('lib/orion-module-new');

exports = module.exports = function (req, res, next) {

  let service = req.headers['fiware-service'];
  let service_path = req.headers['fiware-servicepath'];
  let type = req.params.id;

  entity.entityTypePromise(service, service_path, type).then(function (entities) {
    res.json(entities)
  }).catch((error) => {
    res.json(error)
  });
}