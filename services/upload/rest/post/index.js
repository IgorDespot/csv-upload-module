let upload = require('lib/upload-module');
upload = upload(upload.multer.memoryStorage());

var csvParser = require('lib/csv-parser');
var attrParser = require('lib/attribute-checker');

// Check differente errors and handle displaying them to user
exports = module.exports = function (req, res, next) {
    upload(req, res, (err) => {
        if (err) {
            res.render('upload', {
                msg: err
            });
        } else if (req.file == undefined) {
            res.render('upload', {
                msg: 'Error: No file selected!'
            });
        } else {
            res.render('upload', {
                msg: 'File uploaded.'
            });
            var data = req.file.buffer.toString();
            csvParser.parsePromise(data, {delimiter: ';'})
            .then( (data) => {
                return attrParser.promise(data);
            }).then(
                (data) => {
                    console.log(data);
                }
            );
        }
    });
}