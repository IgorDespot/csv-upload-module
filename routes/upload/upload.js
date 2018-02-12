let express = require('express');
let router = express.Router();
let upload = require('../../lib/upload-module');

router.get('/',  function(req, res, next) {
  res.render('upload');
});

router.post('/', upload.upload.single('userFile'), (req, res, next) => {
    if (req.file === undefined) {
        res.send('Error file type must be csv.')
    } else {
        res.send('Ok.')
    }
});

module.exports = router;