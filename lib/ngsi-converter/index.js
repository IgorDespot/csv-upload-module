/**
 * Ngsi converter module
 * @module lib/ngsi-converter
 */
var attrParser = require('lib/attribute-checker');
var defaultConfig = require('config.json')['ngsi-converter'];
var fileParsers = require('./file-parsers');

var ngsiConverter = function (data, extension, config) {
    var ngsiConfig = config || defaultConfig;
    var parseOptions = ngsiConfig["parse-options"];
    var parsedPromise = undefined;

    if ( fileParsers.hasOwnProperty(extension) ) {
        parsedPromise = fileParsers[extension](data, parseOptions[extension]);
    } else {
        parsedPromise = Promise.reject(`
            Couldn't convert ${extension} data
            to NGSI compatible format
        `);
    }

    return parsedPromise.then(
        (parsedData) => {
            return attrParser.promise(parsedData);
        },
        (err) => {
            return Promise.reject(err);
        }
    );
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