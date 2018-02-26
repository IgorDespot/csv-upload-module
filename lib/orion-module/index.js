const connection = require('../orion-connection/');
const config = require('../../config.json');

/** Connection url of ocb from config */
const path = config["orion-path"];

/** Request headers options for connection to orion contex broker */
const options = config["orion-options"];

/** Take path and open connection to orion context broker */
const conn = connection(path);

exports = module.exports = function (obj) {
    if (obj === undefined)
        throw new Error('No arguments/obj is undefind');
    else
        conn.v2.getEntity(obj.id).then(
            (response) => {
                update(obj);
            }, (error) => {
                if (error.name == 'ConnectionError')
                    console.log('Failed to connect to orion');
                return
                if (error.name == 'InvalidResponseError')
                    console.log('Problems with NGSI specifcation');
                else
                    create(obj);
            }
        ).catch(function (err) {
            console.log('caught' + err);
        });
}

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