/**
 * Ngsi converter module
 * @module lib/ngsi-converter
 */
var csvParser = require('lib/csv-parser');
var attrParser = require('lib/attribute-checker');
var defaultConfig = require('config.json')['ngsi-converter'];

var ngsiConverter = function (data, config) {
    config = config || defaultConfig;
    var ngsiConfig = config;
    return csvParser.parsePromise(
        data,
        ngsiConfig["parse-options"]["csv"]
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