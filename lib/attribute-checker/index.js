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
 * tl;dr: Add new ruleset at runtime.
 *
 * The ruleset object should:
 * 1) Contain properties which will persist after the check
 * 2) The value of the desired ruleset properties can be a Function or an Array
 * 3) If the ruleset property value is a Function, that function will check
 * and adapt the property value of the entity after the attribute check
 * 4) If the ruleset property value is an Array, the Array must have an
 * attribute checking function as the last element, while all the other elements
 * are Strings representing the property keys of input entities.
 * Warning! The order of these keys is important as they will be passed to
 * the attribute checking function in the given order
 *
 * Ruleset examples:
 * var firstRuleset = {
 *  simpleCheck: function (simpleCheck) {
 *   if (simpleCheck) return simpleCheck
 *  }
 * }
 *
 * var secondRuleset = {
 *  compCheck = [
 *   'expectedEntityProp1',
 *   'expectedEntityProp2',
 *   function(prop1, prop2) {
 *      if (prop1+prop2) return prop1+prop2;
 *   }
 *  ]
 * }
 *
 * @param {string} key - Name for the new ruleset
 * @param {Object} ruleset - Object defining the ruleset
 */
exports.addAttributeRuleSet = implementation.addAttributeRuleSet;