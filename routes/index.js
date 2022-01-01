var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    "msg":"Devcode Backend Api Todo"
  })
});

module.exports = router;
