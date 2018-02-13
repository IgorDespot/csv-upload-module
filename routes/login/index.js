const express = require('express');
const router = express.Router();
let login = require('../../lib/login-module');

// Home page
router.get('/', login.authenticate, function(req, res) {
  res.render('index');
});


// Exports
module.exports = router;
