/**
 * @module NgsiConverter
 */

var implementation = require('./ngsi-converter-impl');

/**
 * Return Promise which converts csv to ngsi compatible object.
 * @method ngsiConverter
 * @param {string} data - string abiding by csv rules
 * @param {string} extension - string representing the extension of the file
 *    like the following: '.csv', '.txt', '.xml', etc.
 * @param {object} [config] - config JS object
 * @returns {Promise}
 */
module.exports = implementation;