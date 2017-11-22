var express = require('express');
var router = express.Router();

// hae juurikansio pyynnöllä GET ja ohjaa toiseen polkuun
router.get('/', function(req, res) {
  res.redirect('/varausjarjestelma');
});

module.exports = router;
