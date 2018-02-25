var attributeRules = require('./attribute-rules');

function checkAttributes(data, callback) {
    var result = getData(data).processAttributes();
    callback(null, result);
}

function getData(data) {
    var ruleset = getAttributeRules(data[0].type);
    return {
        processAttributes: function () {
            return processAttributes(ruleset, data);
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
    return result;
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