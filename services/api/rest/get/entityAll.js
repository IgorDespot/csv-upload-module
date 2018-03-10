const { entity }    = require('lib/orion-module-new');

exports = module.exports = function (req, res, next) {

  let service = req.headers['fiware-service'];
  let service_path = req.headers['fiware-servicepath'];
  let type_id = req.params.id;

  entity.listEntitiesPromise(service, service_path, type_id).then(function (entities) {
    res.json(entities)
  }).catch((error) => {
    res.json(error)
  });
}