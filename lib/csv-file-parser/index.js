var csvParser = require('lib/csv-parser');
var fs = require('fs');

let parseFunc = exports.parse = function (file, callback, options) {
    fs.readFile(file, 'utf-8' , function (err, data) {
        csvParser.parse(data, callback, options);
    });
}

exports.parsePromise = function (file, options) {
    return new Promise(
        function(resolve, reject) {
            parseFunc(file, (err, out) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(out);
                }
            }, options);
        }
    );
};