/**
 * Ngsi converter module
 * @module lib/ngsi-converter
 */
var csvParser = require('lib/csv-parser');
var attrParser = require('lib/attribute-checker');
var defaultConfig = require('config.json')['ngsi-converter'];



var ngsiConverter = function (data, extension, config) {
    config = config || defaultConfig;
    var ngsiConfig = config;
    if( extension === '.csv' )
        return csvParser.parsePromise(
            data,
            ngsiConfig["parse-options"][".csv"]
        )
        .then((parsedData) => {
            return attrParser.promise(parsedData);
        });
    else
        return Promise.reject('Conversion for given filetype is not implemented');
}

/**
 * Return Promise which converts csv to ngsi compatible object.
 * @method ngsiConverter
 * @param {string} data - string abiding by csv rules
 * @param {string} extension - string representing the extension of the file
 *    like the following: '.csv', '.txt', '.xml', etc.
 * @param {object} [config] - config JS object
 * @returns {Promise}
 */
module.exports = ngsiConverter;