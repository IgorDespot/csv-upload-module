const connection = require('../orion-connection/');
const config = require('../../config.json');

const path = config["orion-path"];

// To add for live test
const options = config["orion-options"];

const conn = connection(path);

console.log(conn);

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
