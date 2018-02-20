var csvParser = require('lib/csv-parser');
var fs = require('fs');

let parseFunc = exports.parse = function (file, callback) {
    fs.readFile(file, 'utf-8' , function (err, data) {
        csvParser.parse(data, callback);
    });
}

exports.parsePromise = function (file) {
    return new Promise(
        function(resolve, reject) {
            parseFunc(file, (err, out) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(out);
                }
            })
        }
    );
};