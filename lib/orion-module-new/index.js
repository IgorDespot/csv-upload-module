const request = require('request');

/** Config file with  */
const config = require('../../config.json');

/** Url for orion connection */
const orionPath = config["orion-path"];

exports = module.exports = function () {
    return new Promise (function(resolve, reject) {
        request(orionPath + '/v2/entities/', function(error, response, body) {
            if (response.statusCode == 200)
                resolve(JSON.parse(response.body));
            else
                reject(response.statusMessage);
        });
    });
}
