const rp = require('request-promise');
const config = require('../../../../config.json');

const orionPath = config['orion-path'];

module.exports = (req, res, next) => {
  const service = req.headers['fiware-service'];
  const servicePath = req.headers['fiware-servicepath'];
  const type = req.params.id;

  const options = {
    method: 'GET',
    uri: `${orionPath}entities/?type=${type}`,
    headers: {
      'Fiware-Service': service,
      'Fiware-ServicePath': servicePath
    },
    json: true
  };

  rp(options)
    .then((type) => {
      if (type.length === 0) {
        res.status(404)
          .json('The resource (entity, subscription,type etc.) referred in the request has not been found');
      } else { res.json(type); }
    })
    .catch((error) => {
      if (error.statusCode === 404) {
        res.status(404).json('The resource (entity, subscription, etc.) referred in the request has not been found');
      } else if (error.error.code === 'ECONNREFUSED') {
        res.status(503).json('There are no server resources to fulfill the client request.');
      } else {
        res.json(error);
      }
    });
};
