let express = require('express');
let router = express.Router();
let upload = require('../../lib/upload-module');

router.get('/', function (req, res, next) {
    res.render('upload');
});

router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('upload', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('upload', {
                    msg: 'Error: No file Selected!'
                });
            } else {
                res.render('upload', {
                    msg: 'File Uploaded'
                })
            }
        }
    })
});

module.exports = router;