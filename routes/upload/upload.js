var express = require('express');
var router = express.Router();
let upload = require('../../lib/upload-module');

router.get('/',  function(req, res, next) {
  res.render('upload');
});

router.post('/', upload.upload.single('userFile'), (req, res, next) => {
    console.log(req.file);
    res.send('Ok.')
});

module.exports = router;