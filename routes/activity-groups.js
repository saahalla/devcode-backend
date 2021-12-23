var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    msg: 'get all activity groups',
    date: new Date().toISOString()
  });
});

router.get('/:activityId', function(req, res, next) {
  let activityId = req.params.activityId;
  res.send('get activity group by id ' + activityId);
});

router.post('/', function(req, res, next) {
  res.send({
    msg: 'create activity group',
    data: req.body
  });
});

router.delete('/:activityId', function(req, res, next) {
  let activityId = req.params.activityId;
  res.send('delete activity group by id ' + activityId);
});

router.patch('/:activityId', function(req, res, next) {
  let activityId = req.params.activityId;
  res.send('patch activity group by id ' + activityId);
});

module.exports = router;
