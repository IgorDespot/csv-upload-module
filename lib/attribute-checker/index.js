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
    data.forEach( function (obj) {
        var processed = checkObject(obj, ruleset);
        result.push(processed);
    });
    return {
        err: null,
        result
    };
}

function checkObject(obj, ruleset) {
    var result = {};
    for (var property in ruleset) {
        if (ruleset.hasOwnProperty(property)) {
            var propertyChecker = ruleset[property];
            if (typeof propertyChecker === 'function')
                result[property] = propertyChecker(obj[property]);
        }
    }
    return result;
}

exports = module.exports = checkAttributes;

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