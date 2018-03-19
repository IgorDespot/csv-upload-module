var attributeRules = require('./attribute-rules');

var defaultOptions = {
    strictCheck: true
}

function checkAttributes(data, callback, options = defaultOptions) {
    var {err, result} = getRuleset(data).andProcess(options);
    callback(err, result);
}

function getRuleset(data) {
    var ruleset = getAttributeRules(data[0].type);
    if (ruleset instanceof Error) {
        return {
            andProcess: rulesetDoesntExist
        }
    }
    return {
        andProcess: rulesetExists
    }

    function rulesetExists(options) {
        return processAttributes(ruleset, data, options);
    }

    function rulesetDoesntExist() {
        return {
            err: ruleset,
            result: null
        }
    }
}

function getAttributeRules(type) {
    if (
        attributeRules.hasOwnProperty(type)
    ) {
        return attributeRules[type];
    }
    return new Error(`
        Attribute ruleset for ${type} type
        is not defined/doesnt exist
    `);
}

function processAttributes(ruleset, data, options = defaultOptions) {
    var result = [];
    data.forEach(function (entity) {
        var processed = processEntity(ruleset, entity, options);
        result.push(processed);
    });
    return {
        err: null,
        result
    };
}

function processEntity(ruleset, entity, options = defaultOptions) {
    var result = {};
    Object.getOwnPropertyNames(ruleset).forEach((property) => {
        var propertyResult = processEntityProperty(ruleset, entity, property);
        if (propertyResult === null || propertyResult === undefined) {
            return new Error (`${property} property failed processing`);
        }
    });
    return result;
}

function processEntityProperty (ruleset, entity, property) {
    if (typeof ruleset[property] === 'function' && entity[property]) {
        var convertProperty = ruleset[property];
        return convertProperty(entity[property]);
    } else if (ruleset[property] instanceof Array) {
        var checkerResult = convertPropertyWithInjections(
            ruleset[property],
            entity
        );
        return checkerResult;
    }
    return new Error("Rule from ruleset is not of supported type");
}

function convertPropertyWithInjections(array, entity) {
    let duplicate = array.slice();
    let rule = duplicate.pop();
    let args = duplicate.map((x) => {
        return entity[x];
    });
    return rule.apply(null, args);
}

/**
 * Check and adapt attributes
 * @method checkAttributes
 * @param {Object[]} data
 * @param callback
 */
exports = module.exports = checkAttributes;

/**
 * Return promise that checks and adapts attributes
 * @param {Object[]} data
 */
exports.promise = function (data) {
    return new Promise( function (res, rej) {
        checkAttributes(data, function (err, result) {
            if(err) {
                rej(err);
            } else {
                res(result);
            }
        });
    });
}

/**
 * Add new ruleset at runtime
 * @param {string} key - Name for the new ruleset
 * @param {Object} ruleset - Object defining the ruleset
 */
exports.addAttributeRuleSet = function (key, ruleset) {
    if (!attributeRules.hasOwnProperty(key)) {
        attributeRules[key] = ruleset;
        return true;
    } else {
        throw new Error(`
            There already exists a ruleset named ${key}
        `);
    };
}