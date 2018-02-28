let express = require('express');
let router = express.Router();
let {get, post} = require('services/upload/rest');

router.get('/', function (req, res, next) {
    console.log("upload\n");
    get(req, res, next);
});

router.post('/', (req, res) => {
    post(req, res);
});

module.exports = router;