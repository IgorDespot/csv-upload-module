const NGSI = require('ngsijs');

var connection = new NGSI.Connection("http://localhost:1026");

module.exports.listEntities = function () {
    return connection.v2.listEntities();
}
    