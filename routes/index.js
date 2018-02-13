const express = require('express');
const router = express.Router();
let authentificator = require('../lib/login-module/auth');

// Home page
router.get('/', authentificator.auth, function(req, res) {
  res.render('login/index');
});

// Exports
module.exports = router;
