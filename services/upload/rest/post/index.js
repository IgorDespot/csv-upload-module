let upload = require('lib/upload-module');

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
        }
    });
}