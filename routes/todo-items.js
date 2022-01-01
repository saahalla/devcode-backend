var express = require('express')
var router = express.Router()
let TodoController = require('../controllers/TodoController')

router.get('/', TodoController.getAllTodo)
router.get('/:todoItemId', TodoController.getTodo)
router.post('/', TodoController.createTodo)
router.delete('/:todoItemId', TodoController.deleteTodo)
router.patch('/:todoItemId', TodoController.updateTodo)

module.exports = router
