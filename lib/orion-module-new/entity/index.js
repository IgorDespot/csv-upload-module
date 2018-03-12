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

function entityCreatePromise(service, service_path, entity) {
    return new Promise(function (resolve, reject) {
            request({
                method: 'POST',
                url: orionPath + 'entities?options=keyValues',
                headers: {
                    "Content-Type": 'application/json',
                    "Fiware-Service": service,
                    "Fiware-ServicePath": service_path
                },
                body: JSON.stringify(entity)
            }, function (error, response, body) {
                if (response.statusCode === 200) {
                    resolve({
                       "status":[{
                           "type": entity.type,
                            "description":{
                                "id": entity.id
                            },
                            "actions":[{
                                "error":"NO",
                                "status": "SUCCESS",
                                "type": "CREATE"
                            }]
                       }]
                    });
                } else {
                    reject({
                        "status":[{
                            "type": entity.type,
                             "description":{
                                 "id": entity.id
                             },
                             "actions":[{
                                 "error": JSON.parse(response.body),
                                 "status": "FAIL",
                                 "type": "CREATE"
                             }]
                        }]
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
    console.log(url + '/v2/entities/' + entity.id + '/attrs?' + 'options=keyValues')
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
    entityTypePromise,
    entityCreatePromise
}