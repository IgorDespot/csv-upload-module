const connection = require('../orion-connection/');
const config = require('../../config.json');

/** Connection url of ocb from config */
const path = config["orion-path"];

/** Request headers options for connection to orion contex broker */
const options = config["orion-options"];

/** Take path and open connection to orion context broker */
const conn = connection(path);

errors = ['ConnectionError', 'InvalidResponseError']

exports = module.exports = function (data) {
    if (!data)
        throw new Error('Data cannot be undefined');
    return new Promise(function (resolve, reject) {
        conn.v2.getEntity(data.id).then(
            (response) => {
                conn.v2.updateEntityAttributes(
                    data, {
                        keyValues: true
                    }).then(
                    (response) => {
                        resolve('entity updated succesffuly');
                    }, (error) => {
                        reject(error.name);
                    }
                );
            }, (error) => {
                if (errors.includes(error.name))
                    reject(error.name);
                else
                    conn.v2.createEntity(
                        data, {
                            keyValues: true
                        }).then(
                        (response) => {
                            resolve('Successfuly created entity')
                        }, (error) => {
                            reject(error.name);
                        }
                    );
            }
        );
    });
}