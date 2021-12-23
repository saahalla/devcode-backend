var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    msg: 'get all todo items',
    date: new Date().toISOString()
  });
});

router.get('/:todoItemId', function(req, res, next) {
  let todoItemId = req.params.todoItemId;
  res.send({
    msg: 'get todo items ' + todoItemId,
    date: new Date().toISOString()
  });
}); 

router.post('/', function(req, res, next) {
  let data = req.body;
  res.send({
    msg: 'insert todo item',
    data
  })
});

router.delete('/:todoItemId', function(req, res, next) {
  let todoItemId = req.params.todoItemId;
  res.send({
    msg: 'delete todo item ' + todoItemId,
    date: new Date().toISOString()
  });
}); 

router.patch('/:todoItemId', function(req, res, next) {
  let todoItemId = req.params.todoItemId;
  res.send({
    msg: 'patch todo item ' + todoItemId,
    date: new Date().toISOString()
  });
}); 

module.exports = router;
