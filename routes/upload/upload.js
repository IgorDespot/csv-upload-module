let express = require('express');
let router = express.Router();
let uploadPostService = require('services/upload/post');
let uploadGetService = require('services/upload/get')

router.get('/', function (req, res, next) {
    uploadGetService(req, res, next);
});

router.post('/', (req, res) => {
    uploadPostService(req, res);
});

module.exports = router;