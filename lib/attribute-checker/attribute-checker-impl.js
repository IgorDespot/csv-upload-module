var attributeRules = require('./attribute-rules');

var defaultOptions = {
    strictEntityCheck: false
}

function checkAttributes(data, callback, options = defaultOptions) {
    var {err, result} = getRuleset(data).andProcess(options);
    callback(err, result);
}

function getRuleset(data) {
    var dataType = data[0].type;
    var ruleset = getAttributeRules(dataType);
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
    var err = [];
    data.forEach((entity) => {
        var processed = processEntity(ruleset, entity, options);
        if (processed instanceof Error ) {
            err.push(processed.message);
        } else {
            result.push(processed);
        }
    });
    return {
        err: getErrorsIfTheyExist(),
        result
    };

    function getErrorsIfTheyExist() {
        return err.length ? err : null;
    }
}

function processEntity(ruleset, entity, options = defaultOptions) {
    var entityResult = processEntityProperties(ruleset, entity);
    if (options.strictEntityCheck) {
        var propertyValidity = checkPropertyValidity(entityResult);
        if (propertyValidity.isValid) {
            return entityResult;
        } else {
            var printableCulprits = JSON.stringify(propertyValidity.culprits);
            return new Error(`
                Entity ${entity.id} has illegal ${printableCulprits} properties
            `);
        }
    }
    return entityResult;
}

function processEntityProperties(ruleset, entity) {
    var result = {};
    var rules = Object.getOwnPropertyNames(ruleset);
    rules.forEach((property) => {
        result[property] = processEntityProperty(ruleset, entity, property);
    });
    return result;
}

function processEntityProperty(ruleset, entity, property) {
    if (
        typeof ruleset[property] === 'function'
        && entity[property] !== undefined
        && entity[property] !== null
    ) {
        var convertProperty = ruleset[property];
        return convertProperty(entity[property]);
    } else if (ruleset[property] instanceof Array) {
        var checkerResult = convertPropertyWithInjections(
            ruleset[property],
            entity
        );
        return checkerResult;
    }
}

function checkPropertyValidity(obj) {
    var properties = Object.getOwnPropertyNames(obj);
    var culprits = [];
    properties.forEach((property) => {
        if (obj[property] === null || obj[property] === undefined) {
            culprits.push(property);
        }
    });
    let culpritsDontExist = !culprits.length;
    if (culpritsDontExist) {
        return {
            isValid: true
        }
    }
    return {
        isValid: false,
        culprits
    }
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
 * @param {Object} [options]
 */
exports = module.exports = checkAttributes;

/**
 * Return promise that checks and adapts attributes
 * @param {Object[]} data
 * @param {Object} [options]
 */
exports.promise = function (data, options = defaultOptions) {
    return new Promise(function (res, rej) {
        checkAttributes(data, function (err, result) {
            if(err) {
                rej({err, result});
            } else {
                res(result);
            }
        }, options);
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