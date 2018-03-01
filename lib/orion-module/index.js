const connection = require('../orion-connection/');
const config = require('../../config.json');

/** Connection url of ocb from config */
const path = config["orion-path"];

/** Request headers options for connection to orion contex broker */
const options = config["orion-options"];

/** Take path and open connection to orion context broker */
const conn = connection(path);

/** Error array to lower code length */
errors = ['ConnectionError', 'InvalidResponseError']

/**
 * @param {Object} data Represents data object from parsed file with all
   attributes needed for orion
 */
exports = module.exports = function (data) {
    if (!data)
        throw new Error('Data cannot be undefined');
    return new Promise(function (resolve, reject) {
        console.log('Getting entity' + data.id);
        conn.v2.getEntity(data.id).then(
            (response) => {
                conn.v2.updateEntityAttributes(
                    data, {
                        keyValues: true
                    }).then(
                    (response) => {
                        console.log('Updated' + response.entity.id)
                        resolve('entity updated succesffuly');
                    }, (error) => {
                        reject(error.name);
                    }
                );
            }, (error) => {
                if (errors.includes(error.name))
                    reject(error.name);
                else
                    console.log('Creating entiy' + data.id);
                    conn.v2.createEntity(
                        data, {
                            keyValues: true
                        }).then(
                        (response) => {
                            console.log('Created' + response.entity.id)
                            resolve('Successfuly created entity')
                        }, (error) => {
                            reject(error.name);
                        }
                    );
            }
        );
    });
}

/**
 *
 * @param {*} data Delete option for entities in case of emergency
 */
function del(data) {
    return new Promise(function (resolve, reject) {
        conn.v2.deleteEntity(data.id).then(
            (response) => {
                resolve('Entitty was deleted successfuly');
            }, (error) => {
                reject(error.name);
            }
        );
    });
}

exports.listAll = function listAll() {
  return new Promise(function (resolve, reject) {
    conn.v2.listEntities().then(
      (response) => {
          resolve(response.results);
      }, (error) => {
          reject(error.name);
      }
    );
  });
}
