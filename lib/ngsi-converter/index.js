/**
 * Ngsi converter module
 * @module lib/ngsi-converter
 */
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

/**
 * Return Promise which converts csv to ngsi compatible object.
 * @method ngsiConverter
 * @param {string} data - string abiding by csv rules
 * @param {object} [config] - config JS object
 * @returns {Promise}
 */
module.exports = ngsiConverter;