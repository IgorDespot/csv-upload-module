const connection = require('../orion-connection/');
const config = require('../../config.json');

/** Connection url of ocb from config */
const path = config["orion-path"];

/** Request headers options for connection to orion contex broker */
const options = config["orion-options"];

/** Take path and open connection to orion context broker */
const conn = connection(path);

errors = ['ConnectionError', 'InvalidResponseError']

/**
 * Export this function so we can use it in other part of system
 * @param {Object} obj Represent object that we get from parsed .csv we provided via upload
 */
// exports = module.exports = function (obj, cb) {
//     if (obj === undefined)
//         throw new Error('No arguments/obj is undefind');
//     else
//         conn.v2.getEntity(obj.id).then(
//             (response) => {
//                 update(obj, (info) => {
//                     if (info)
//                         cb(info)
//                 });
//             }, (error) => {
//                 if (errors.includes(error.name))
//                     cb('Error:' + error.name)
//                 else
//                     create(obj, (info) => {
//                         cb(info)
//                     });
//             }
//         ).catch(function (error) {
//             console.log('caught' + error);
//         });
// }

/** 
 * @param {Object} obj Recive object from parsed file witch contains attributes for update.
 */
function update(obj, cb) {
    conn.v2.updateEntityAttributes(
        obj, {
            keyValues: true
        }).then(
        (response) => {
            console.log('good')
        }, (error) => {
            if (error.name == 'InvalidRequestError')
                cb('Error:' + error.name)
            else
                console.log(error);
        }
    );
}

/**
 * 
 * @param {Object} obj Recive object from parsed file witch contains attributes we need to create new entity.
 */
function create(obj, cb) {
    conn.v2.createEntity(
        obj, {
            keyValues: true
        }).then(
        (response) => {
            console.log('Entity created successfuly');
        }, (error) => {
            if (error.name == 'InvalidRequestError')
                cb(error.name);
            else
                console.log('Jon Doe error');
        }
    );
}

exports = module.exports = function (data) {
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