const rp = require('request-promise');
const config = require('../../../../config.json');

const orionPath = config['orion-path'];

module.exports = (req, res, next) => {
  const service = req.headers['fiware-service'];
  const servicePath = req.headers['fiware-servicepath'];

  const options = {
    method: 'GET',
    uri: `${orionPath}entities/`,
    headers: {
      'Fiware-Service': service,
      'Fiware-ServicePath': servicePath
    },
    json: true
  };

  rp(options)
    .then((entities) => {
      res.json(entities);
    })
    .catch((error) => {
      if (error.error.code === 'ECONNREFUSED') {
        res.status(503).json('There are no server resources to fulfill the client request.');
      } else { res.json(error); }
    });
};
