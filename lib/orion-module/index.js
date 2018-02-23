const NGSI = require('ngsijs');

var connection = new NGSI.Connection("http://localhost:1026");

    // TOOD
    // 'Content-Type': 'application/json',
    // 'FIWARE-Service': 'waste4think',
    // 'FIWARE-Servicepath': '/deusto/w4t/zamudio/real'

    connection.v2.createEntity({

    }, {keyValues: true}).then(
        (response) => {
            console.log('all went file add resp')
        }, (error) => {
            console.log('went bad')
        }
    );



    module.exports = function(data) {
        connection.v2.getEntity({
            data,
        }).then(
            (response) => {
                
            }, (error) => {

            }
        );
    }