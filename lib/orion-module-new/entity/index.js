const config = require('../../../config.json');
const orionPath = config["orion-path"];
const request = require('request');

function listEntitiesPromise(service, service_path) {
    return new Promise(function (resolve, reject) {
        request({
            method: 'GET',
            url: orionPath + 'entities/',
            headers: {
                "Fiware-Service": service,
                "Fiware-ServicePath": service_path
            }
        }, function (error, response, body) {
            if (response.statusCode !== 200)
                reject("Error: " + response.body)
            else
                resolve(JSON.parse(response.body))
        });
    });
}

function singleEntityPromise(service, service_path, entitiy_id) {
    return new Promise(function (resolve, reject) {
        request({
            method: 'GET',
            url: orionPath + 'entities/' + entitiy_id,
            headers: {
                "Fiware-Service": service,
                "Fiware-ServicePath": service_path
            }
        }, function (error, response, body) {
            if (response.statusCode !== 200)
                reject("Error: " + response.body)
            else
                resolve(JSON.parse(response.body))
        });
    });
}

function entityTypePromise(service, service_path, type) {
    return new Promise(function (resolve, reject) {
        request({
            method: 'GET',
            url: orionPath + 'entities/?type=' + type,
            headers: {
                "Fiware-Service": service,
                "Fiware-ServicePath": service_path
            }
        }, function (error, response, body) {
            if (response.statusCode !== 200)
                reject("Error: " + response.body)
            else
                resolve(JSON.parse(response.body))
        });
    });
}

/** TODO */
function createEntity(entity) {
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

    return createEntityPromise(entity);
}

function createEntityPromise(entity) {
    if (entity === undefined)
        throw new Error('Entity must be defined')
    if (typeof entity !== 'object')
        throw new Error('Entity must be object')
    else
        return new Promise(function (resolve, reject) {
            request({
                method: 'POST',
                url: url + '/v2/entities?options=keyValues',
                headers: {
                    'Content-Type': 'application/json',
                    'Fiware-Service': 'w4t_test',
                    'Fiware-ServicePath': '/w4t/test'
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

function updateEntityPromise(entity) {
    console.log(entity.id);
    console.log(entity.type);
    let  bodyValue  =  Object.assign({},  entity, {
        id: undefined,
        type: undefined
    });
    console.log(url + '/v2/entities/' + entity.id + '/attrs?type=' + entity.type + '&options=keyValues')
    return new Promise((resolve, reject) => {
        request({
            method: 'PATCH',
            url: url + '/v2/entities/' + entity.id + '/attrs?&options=keyValues',
            headers: {
                'Content-Type': 'application/json',
                'Fiware-Service': 'w4t_test',
                'Fiware-ServicePath': '/w4t/test'
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
    listEntitiesPromise,
    singleEntityPromise,
    entityTypePromise
}