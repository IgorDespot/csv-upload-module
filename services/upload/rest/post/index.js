let upload = require('lib/upload-module');
let storage = upload.multer.memoryStorage();

upload = upload(storage);

exports = module.exports = function (req, res, next) {
    upload(req, res, (err) => {
        if (err) {
            res.render('upload', {
                msg: err
            });
        } else if (req.file == undefined) {
            res.render('upload', {
                msg: 'Error: No file Selected!'
            });
        } else {
            res.render('upload', {
                msg: 'File Uploaded'
            });
        }
    });
}