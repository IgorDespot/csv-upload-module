let express = require('express');
let router = express.Router();
let {get, post, patch} = require('services/api/rest');

router.get('/', function (req, res, next) {
    get(req, res, next);
});

router.post('/', (req, res) => {
    post(req, res);
});

router.patch('/update', (req, res) => {
    patch(req, res);
});

module.exports = router;