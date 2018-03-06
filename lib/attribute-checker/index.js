var attributeRules = require('./attribute-rules');

function checkAttributes(data, callback) {
    var {err, result} = getData(data)();
    callback(err, result);
}

function getData(data) {
    var ruleset = getAttributeRules(data[0].type);
    if (!(ruleset instanceof Error))
        return function rulesetExtractedFunction() {
            return processAttributes(ruleset, data)
        }
    else {
        return function noTypeErrorFunction() {
            return {
                err: ruleset,
                result: null
            }
        }
    }
}

function getAttributeRules(type) {
    if (
        attributeRules.hasOwnProperty(type)
    ) {
        return attributeRules[type];
    } else {
        return new Error(`
            Attribute ruleset for ${type} type
            is not defined/doesnt exist
        `);
    }
}

function processAttributes(ruleset, data) {
    var result = [];
    data.forEach( function (entity) {
        var processed = processEntity(entity, ruleset);
        result.push(processed);
    });
    return {
        err: null,
        result
    };
}

function processEntity(entity, ruleset) {
    var result = {};
    Object.getOwnPropertyNames(ruleset).forEach((property) => {
        var propertyChecker = ruleset[property];
        if (typeof propertyChecker === 'function' && entity[property])
            result[property] = propertyChecker(entity[property]);
        else if (propertyChecker instanceof Array) {
            checkerResult = processArrayRule(
                propertyChecker,
                entity
            );
            if (checkerResult) {
                checkerResult = JSON.stringify(checkerResult);
                console.log(`${checkerResult} from ${property}`)
                result[property] = checkerResult;
            }
        }
    });
    return result;
}

function processArrayRule(array, entity) {
    let temp = array.slice();
    let rule = temp.pop();
    temp = temp.map((x) => {
        return entity[x];
    });
    return rule.apply(null, temp);
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