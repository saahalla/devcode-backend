var express = require('express')
var router = express.Router()
let __todo = require('../class/todo.class')
let Todo = new __todo()

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let activity_group_id = req.query.activity_group_id
  let data
  if (activity_group_id) {
    data = await Todo.getAll(activity_group_id)
  } else {
    data = await Todo.getAll()
  }
  console.log(data)

  res.send({
    status: 'Success',
    message: 'Success',
    data: data,
  })
})

router.get('/:todoItemId', async function (req, res, next) {
  let todoItemId = req.params.todoItemId
  let data = await Todo.get(todoItemId)

  if (data.length > 0) {
    res.send({
      status: 'Success',
      message: 'Success',
      data: data[0],
    })
  } else {
    res.status(404).send({
      status: 'Not Found',
      message: `Todo with ID ${todoItemId} Not Found`,
      data: {},
    })
  }
})

router.post('/', async function (req, res, next) {
  let title = req.body.title
  let activity_group_id = req.body.activity_group_id
  if (!title || title === null || title === undefined || title === '') {
    res.status(400).send({
      status: 'Bad Request',
      message: 'title cannot be null',
      data: {},
    })
  } else if (!activity_group_id) {
    res.status(400).send({
      status: 'Bad Request',
      message: 'activity_group_id cannot be null',
      data: {},
    })
  } else {
    let data = await Todo.add(req.body)
    console.log({ datatset: data })
    if (data.is_active == '1') {
      data.is_active = true
    }
    if (data) {
      res.status(201).send({
        status: 'Success',
        message: 'Success',
        data: data,
      })
    } else {
      res.status(404).send({
        status: 'Not Found',
        message: `Activity with activity_group_id ${req.body.activity_group_id} Not Found`,
      })
    }
  }
})

router.delete('/:todoItemId', async function (req, res, next) {
  let todoItemId = req.params.todoItemId
  let data = await Todo.get(todoItemId)

  if (data.length > 0) {
    let query = await Todo.delete(todoItemId)
    if (query) {
      res.send({
        status: 'Success',
        message: 'Success',
        data: {},
      })
    } else {
      res.status(404).send({
        status: 'Not Found',
        message: `Todo with ID ${todoItemId} Not Found`,
        data: {},
      })
    }
  } else {
    res.status(404).send({
      status: 'Not Found',
      message: `Todo with ID ${todoItemId} Not Found`,
      data: {},
    })
  }
})

router.patch('/:todoItemId', async function (req, res, next) {
  console.log({
    body: req.body,
  })
  let todoItemId = req.params.todoItemId
  let title = req.body.title
  let is_active = req.body.is_active
  let data = await Todo.get(todoItemId)

  if (data.length > 0) {
    let query = await Todo.update(todoItemId, title, is_active)
    res.status(200).send({
      status: 'Success',
      message: 'Success',
      data: query,
    })
  } else {
    res.status(404).send({
      status: 'Not Found',
      message: `Todo with ID ${todoItemId} Not Found`,
      data: {},
    })
  }
})

module.exports = router
