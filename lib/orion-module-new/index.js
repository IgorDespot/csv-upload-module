const request = require('request');
const {
  URL
} = require('url');

/** Config file with  */
const config = require('../../config.json');

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

function listEntityPromise(service, servicePath) {
  return new Promise(function (resolve, reject) {
    request({
      method: 'GET',
      url: url + '/v2/entities',
      headers: {
        'Fiware-Service': service,
        'Fiware-ServicePath': servicePath
      }
    }, function (error, response, body) {
      if (response.statusCode !== 200)
        reject("Error: " + response.body)
      var data;
      try {
        data = JSON.parse(response.body);
      } catch (e) {
        reject("Server returned invalid JSON contente");
      }
      resolve(data)
    });
  });
}

function createEntity(service,servicePath,entity) {
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

  return createEntityPromise(service,servicePath,entity);
}

function createEntityPromise(service,servicePath,entity) {
  if (entity === undefined)
    throw new Error('Entity must be defined')
  if (typeof entity !== 'object')
    throw new Error('Entity must be object')
  else
    return new Promise(function (resolve, reject) {
      request({
        method: 'POST',
        url: utl + '/v2/entities?options=keyValues',
        headers: {
          'Content-Type': 'application/json',
          'Fiware-Service': service,
          'Fiware-ServicePath': servicePath
        },
        body: JSON.stringify(entity)
      }, function (error, response, body) {
        if (response.statusCode == 201) {
          resolve({
            msg: `Successfully created requested entity ${entity.id}`,
            responseBody: JSON.parse(response.body)
          });
        } else {
          reject({
            msg: `Failed creating entity ${entity.id}`,
            responseBody: JSON.parse(response.body)
          });
        }
      });
    })
}

function updateEntityPromise(service,servicePath,entity) {
  let bodyValue = Object.assign({}, entity, {id: undefined, type: undefined});
  return new Promise((resolve,reject) => {
    request({
      method: 'PATCH',
      url: url + '/v2/entities/'+ entity.id + '/attrs?type='+ entity.type +'&options=keyValues',
      headers: {
        'Content-Type': 'application/json',
        'Fiware-Service': service,
        'Fiware-ServicePath': servicePath
      },
      body: JSON.stringify(entity)
    }, function (error, response, body) {
      if (response.statusCode === 200)
        resolve({
          msg: `Successfully updated requested entity ${entity.id}`,
          responseBody: JSON.parse(response.body)
        });
      else 
        reject({
          msg: `Failed updating entity ${entity.id}`,
          responseBody: JSON.parse(response.body)
        });
    });
  })
}

exports = module.exports = {
  listEntities,
  createEntity,
  orionPath,
  updateEntityPromise
}