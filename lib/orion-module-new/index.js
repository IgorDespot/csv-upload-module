const request = require('request');

/** Config file with  */
const config = require('../../config.json');

/** Url for orion connection */
const orionPath = config["orion-path"];

function listEntities() {
  return new Promise(function(resolve, reject) {
    request(orionPath + '/v2/entities/', function(error, response, body) {
      if (response.statusCode == 200)
        resolve(JSON.parse(response.body));
      else
        reject(response.statusMessage);
      }
    );
  });
}

function createEntity(entity) {
  return new Promise(function(resolve, reject) {
    request({
      method: 'POST',
      url: orionPath + '/v2/entities/?options=' + 'keyValues',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(entity)
    }, function (error, response, body) {
        if (response.statusCode == 201)
            resolve('Resposne', body);
        else
            reject(response.statusMessage);
    });
  });
}

exports = module.exports = {
    listEntities,
    createEntity
}
