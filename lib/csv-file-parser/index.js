var csvParser = require('lib/csv-parser');
var fs = require('fs');

exports.parse = function (file, callback) {
    fs.readFile(file, 'utf-8' , function (err, data) {
        csvParser.parse(data, callback);
    });
}