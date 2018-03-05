const request = require('request');

exports = module.exports = function () {
    return new Promise (function(resolve, reject) {
        request('http://localhost:1026/v2/entities/', function(error, response, body) {
            if (response.statusCode == 200)
                resolve(JSON.parse(response.body));
            else
                reject(response.statusMessage);
        });
    });
}
