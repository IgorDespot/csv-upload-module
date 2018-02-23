let upload = require('lib/upload-module');
upload = upload(upload.multer.memoryStorage());

var csvParser = require('lib/csv-parser');
var attrParser = require('lib/attribute-checker');

const NGSI = require('ngsijs');
var connection = new NGSI.Connection("http://localhost:1026");

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
            }).then( function (data) {
                return Promise.all(data);
            })
            .then(
                (data) => {
                    return connection.v2.createEntity(
                        data, {
                            keyValues: true
                        }
                    );
                }
            ).then(
                (res) => {
                    console.log('it lives');
                }, (err) => {
                    console.log(err);
                }
            );
        }
    });
}