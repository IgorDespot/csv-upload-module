const { entity }    = require('lib/orion-module-new');

exports = module.exports = function (req, res, next) {

  let service = req.headers['fiware-service'];
  let service_path = req.headers['fiware-servicepath'];
  let entity_id = req.params.id;

  entity.singleEntityPromise(service, service_path, entity_id).then(function (entity) {
    res.json(entity)
  }).catch((error) => {
    res.json(error)
  });
}