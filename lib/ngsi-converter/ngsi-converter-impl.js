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
        let parse = fileParsers[extension];
        parsedPromise = parse(data, parseOptions[extension]);
    } else {
        parsedPromise = Promise.reject(`
            Conversion for ${extension} extension isn't supported
        `);
    }

    return parsedPromise.then(
        (parsedData) => {
            return attrParser.promise(parsedData);
        }
    );
}

/**
 * @method ngsiConverter
 * @param {string} data - string abiding by csv rules
 * @param {string} extension - string representing the extension of the file
 *    like the following: '.csv', '.txt', '.xml', etc.
 * @param {object} [config] - config JS object
 * @returns {Promise}
 */
module.exports = ngsiConverter;