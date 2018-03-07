var implementation = require('./attribute-checker-impl');

/**
 * Check and adapt attributes
 * @method checkAttributes
 * @param {Object[]} data
 * @param callback
 */
exports = module.exports = implementation;

/**
 * Return promise that checks and adapts attributes
 * @param {Object[]} data
 */
exports.promise = implementation.promise;

/**
 * Add new ruleset at runtime
 * @param {string} key - Name for the new ruleset
 * @param {Object} ruleset - Object defining the ruleset
 */
exports.addAttributeRuleSet = implementation.addAttributeRuleSet;