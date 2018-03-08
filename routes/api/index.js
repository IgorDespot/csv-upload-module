let express = require('express');
let router = express.Router();
let {get, post} = require('services/api/rest');

router.get('/', function (req, res, next) {
    get(req, res, next);
});

router.post('/', (req, res) => {
    post(req, res);
});

module.exports = router;