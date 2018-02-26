const connection = require('../orion-connection/');
const config = require('../../config.json');

/** Connection url of ocb from config */
const path = config["orion-path"];

/** Request headers options for connection to orion contex broker */
const options = config["orion-options"];

/** Take path and open connection to orion context broker */
const conn = connection(path);

/**
 * Export this function so we can use it in other part of system
 * @param {Object} obj Represent object that we get from parsed .csv we provided via upload
 */
exports = module.exports = function (obj) {
    if (obj === undefined)
        throw new Error('No arguments/obj is undefind');
    else
        conn.v2.getEntity(obj.id).then(
            (response) => {
                update(obj);
            }, (error) => {
                if (error.name == 'ConnectionError')
                    console.log(error.name)
                return
                if (error.name == 'InvalidResponseError')
                    console.log(error.name)
                else
                    create(obj);
            }
        ).catch(function (err) {
            console.log('caught' + err);
        });
}

/** 
 * @param {Object} obj Recive object from parsed file witch contains attributes for update.
 */
function update(obj) {
    conn.v2.updateEntityAttributes(
        obj, {
            keyValues: true
        }).then(
        (response) => {
            console.log('Entities updated successfuly');
        }, (error) => {
            if (error.name == 'InvalidRequestError')
                console.log('Error in entity/fileds');
            else
                console.log(error);
        }
    );
}

/**
 * 
 * @param {Object} obj Recive object from parsed file witch contains attributes we need to create new entity.
 */
function create(obj) {
    conn.v2.createEntity(
        obj, {
            keyValues: true
        }).then(
        (response) => {
            console.log('Entity created successfuly');
        }, (error) => {
            if (error.name == 'InvalidRequestError')
                console.log('Error in entity/fileds');
            else
                console.log('Jon Doe error');
        }
    );
}