var express = require('express');
var router = express.Router();

var VERSION = "0.0.1";

var user = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('api version : ' + VERSION);
});

router.post('/user/register', user.register);
router.post('/user/login', user.login);

module.exports = router;
