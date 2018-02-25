const connection = require('../orion-connection/');
const config = require('../../config.json');

/** Connection url of ocb from config */
const path = config["orion-path"];

/** Request headers options for connection to orion contex broker */
const options = config["orion-options"];

/** Take path and open connection to orion context broker */
const conn = connection(path);

/** Module.exports allows us to pass this to other files when it is called */
exports = module.exports = function (obj) {
    conn.v2.getEntity(obj.id).then(
        (response) => {
            conn.v2.updateEntityAttributes({
                obj
            }, {
                keyValues: true
            }).then(
                (response) => {
                    console.log('All went fine entity is updated successfuly');
                }, (error) => {
                    console.log('Error entity was not updated');
                }
            );
        }, (error) => {
            if (error.name == 'InvalidResponse') {
                conn.v2.createEntity({
                    obj
                }).then(
                    (response) => {
                        console.log('Entity was created successfuly');
                    }, (error) => {
                        console.log('Error entity was not created successfuly');
                    }
                );
            }
        }
    );
}

conn.v2.getEntity(parse.id).then(
    (response) => {
        connection.v2.updateEntityAttributes({
            parse
        }, {
            keyValues: true
        }).then(
            (response) => {
                console.log('all good');
            }, (error) => {
                if (error.name == 'InvalidRequestError')
                    console.log('Error in entity/fileds');
                else
                    console.log('Jon Doe error');    
            }
        );
    }, (error) => {
        if (error.name == 'ConnectionError')
            console.log('Failed to connect to orion');
        if (error.name == 'InvalidResponseError')
            console.log('Problems with NGSI specifcation');
        else
        connection.v2.createEntity({
            parse
        }, {keyValues: true}).then(
            (response) => {
                console.log('all good');
            }, (error) => {
                if (error.name == 'InvalidRequestError')
                    console.log('Error in entity/fileds');
                else
                    console.log('Jon Doe error');
            }
        );
    }
);