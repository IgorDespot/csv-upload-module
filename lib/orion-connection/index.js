const NGSI = require('ngsijs');
const config = require('../../config.json');

/** Module.exports allows us to pass this to other files when it is called
 *  Path represent url for orion contex broker, can also recive aditional options (request_headers)
  */
exports = module.exports = function (path, options) {
    if (typeof path === 'object') 
        path = path["orion-path"];
    if (typeof path !== 'string')
        throw new Error("Path not type of string");
    if (!options)
        return new NGSI.Connection(path);
    else 
        return new NGSI.Connection(path, options);
} 
