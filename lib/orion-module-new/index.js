const request = require('request');
const {URL} = require('url');

/** Config file with  */
const config = require('config.json');

/** Url for orion connection */
let orionPath = config["orion-path"];

function listEntities() {
  if (orionPath === undefined)
    throw new Error('Orion path must be defined');

  try {
    url = new URL(orionPath);
  } catch (e) {
    throw new TypeError('Invalid url parameter');
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new TypeError("unsupported protocol: " + url.protocol.substr(0, url.protocol.length - 1));
  }

  return listEntityPromise();
}

function listEntityPromise() {
  return new Promise(function(resolve, reject) {
    request(url + '/v2/entities/', function(error, response, body) {
      if (response.statusCode !== 200)
        reject("Error: " + reposne.statusMessage);

      var data;

      try {
        data = JSON.parse(response.body);
      } catch (e)  {
        reject('Server returned invalid JSON content');
      }

      resolve(data);
    });
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
    }, function(error, response, body) {
      if (response.statusCode == 201)
        resolve('Resposne', body);
      else
        reject(response.statusMessage);
      }
    );
  });
}

exports = module.exports = {
  listEntities,
  createEntity,
  orionPath
}
