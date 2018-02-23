let express = require('express');
let router = express.Router();

const NGSI = require('ngsijs');

var connection = new NGSI.Connection("http://localhost:1026");

router.get('/', function (req, res, next) {
    connection.v2.listEntities()
    .then((response) => {
        res.send(response);
    });
});



module.exports = router;