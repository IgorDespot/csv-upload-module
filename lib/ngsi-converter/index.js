var csvParser = require('lib/csv-parser');
var attrParser = require('lib/attribute-checker');
var defaultConfig = require('config.json');

var ngsiConverter = function (data, config) {
    config = config || defaultConfig;
    var ngsiConfig = config['ngsi-converter']
    return csvParser.parsePromise(
        data,
        ngsiConfig["parse-options"]
    )
    .then((data) => {
        return attrParser.promise(data);
    });
}

module.exports = ngsiConverter;