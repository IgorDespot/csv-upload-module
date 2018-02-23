const NGSI = require('ngsijs');
const config = require('../../config.json');

console.log(config["orion-path"]);

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
