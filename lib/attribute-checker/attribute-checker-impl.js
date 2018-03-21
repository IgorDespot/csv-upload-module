var attributeRules = require('./attribute-rules');

var defaultOptions = {
    strictEntityCheck: false,
    strictEntityPropertyCheck: false
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
        var err = ruleset;
        return {
            err,
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
    return new Error(
        `Attribute ruleset for ${type} type is not defined/doesnt exist`
    );
}

function processAttributes(ruleset, data, options = defaultOptions) {
    var result = [];
    var err = [];
    data.forEach((entity) => {
        var processedEntity = processEntity(ruleset, entity, options);
        if (processedEntity instanceof Error ) {
            err.push(processedEntity.message);
        } else {
            result.push(processedEntity);
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
    if (entityResult instanceof Error) {
        return entityResult;
    }
    if (options.strictEntityCheck) {
        var propertyValidity = checkPropertyValidity(entityResult);
        if (propertyValidity.isValid) {
            return entityResult;
        } else {
            var printableCulprits = JSON.stringify(propertyValidity.culprits);
            return new Error(
                `Entity ${entity.id} has illegal ${printableCulprits} properties`
            );
        }
    }
    return entityResult;
}

function processEntityProperties(ruleset, entity, options = defaultOptions) {
    var result = {};
    var rules = Object.getOwnPropertyNames(ruleset);
    rules.forEach((property) => {
        var thereAreNoErrors = !(result instanceof Error);
        if (thereAreNoErrors) {
            result[property] = processEntityProperty(
                ruleset,
                entity,
                property,
                options
            );
            if (result[property] instanceof Error) {
                result = result[property];
            }
        }
    });
    return result;
}

function processEntityProperty(ruleset, entity, property, options) {
    var ruleComposite;
    if (typeof ruleset[property] === 'function') {
        ruleComposite = [property, ruleset[property]];
    } else if (ruleset[property] instanceof Array) {
        ruleComposite = ruleset[property];
    } else {
        return new Error(`Ruleset ${property} rule was not of supported type`);
    }
    var checkerResult = convertPropertyWithInjections(
        ruleComposite,
        entity,
        options
    );
    return checkerResult;
}

function convertPropertyWithInjections(array, entity, options) {
    let arrayDuplicate = array.slice();
    let rule = arrayDuplicate.pop();
    var mappingFunction;
    if (options.strictEntityPropertyCheck) {
        mappingFunction = function strictPropertyMapping(property) {
            return entity[property];
        }
    } else {
        mappingFunction = function caseInsensitivePropertyMapping(property) {
            var caseInsensitiveProperty = findProperty(entity, property);
            return entity[caseInsensitiveProperty];
        }
    }
    let args = arrayDuplicate.map(mappingFunction);
    return rule.apply(null, args);
}

function findProperty(target, property) {
    var targetProperties = Object.getOwnPropertyNames(target);
    var viableProperties = targetProperties.filter((targetProperty) => {
        return (property.toLowerCase() === targetProperty.toLowerCase());
    });
    return viableProperties[0];
}

function checkPropertyValidity(obj) {
    var properties = Object.getOwnPropertyNames(obj);
    var culprits = [];
    properties.forEach((property) => {
        if (obj[property] === null || obj[property] === undefined) {
            culprits.push(property);
        }
    });
    let culpritsDontExist = Boolean(!culprits.length);
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
        throw new Error(
            `There already exists a ruleset named ${key}`
        );
    };
}