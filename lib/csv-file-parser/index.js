var csvParser = require('lib/csv-parser');
var fs = require('fs');

exports.parseCsv = function (file, callback) {
    fs.readFile(file, 'utf-8' , function (err, data) {
        csvParser.parse(data, callback);
    });
}