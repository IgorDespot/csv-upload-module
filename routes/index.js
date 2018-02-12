const express = require('express');
const router = express.Router();
let authentificator = require('../auth');


// Home page
router.get('/', authentificator.auth, function(req, res) {
  res.render('index');
});


// Exports
module.exports = router;
