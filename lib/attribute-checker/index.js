/**
 * @module AttributeChecker
 */

var implementation = require('./attribute-checker-impl');

/**
 * tl;dr: Check and adapt attributes
 *
 * This method takes an array of valid JS objects,
 * checks if the "type" property exists and if the
 * ruleset for it has been defined.
 * If the ruleset exists, all objects within the array
 * are checked and adapted according to the ruleset
 *
 * @method checkAttributes
 * @param {Object[]} data
 * @param callback
 */
exports = module.exports = implementation;

/**
 * Return promise that checks and adapts attributes
 *
 * Same as the checkAttributes method,
 * but wrapped in Promise API
 *
 * @param {Object[]} data
 */
exports.promise = implementation.promise;

/**
 * Add new ruleset at runtime.
 *
 * @param {string} key - Name for the new ruleset
 * @param {Object} ruleset - Object defining the ruleset
 */
exports.addAttributeRuleSet = implementation.addAttributeRuleSet;