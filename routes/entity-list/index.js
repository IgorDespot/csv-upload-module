let express = require('express');
let router = express.Router();
const all = require('../../lib/orion-module').listAll;

router.get('/', function (req, res, next) {
    all().then(function(entities) {
      console.log(entities);
      res.send(entities)
    }).catch((error) => {
      console.log(error);
      res.send(error)
    });
});



module.exports = router;
