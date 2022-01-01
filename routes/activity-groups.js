var express = require('express')
var router = express.Router()
let __activity = require('../class/activity.class')
let Activity = new __activity()

/* Get All Activity */
router.get('/', async function (req, res, next) {
  let data = await Activity.getAll()
  // console.log(data)

  res.send({
    status: 'Success',
    message: 'Success',
    data: data,
  })
})

/* Get One Activity */
router.get('/:activityId', async function (req, res, next) {
  let activityId = req.params.activityId
  let data = await Activity.get(activityId)

  if (data.length > 0) {
    res.send({
      status: 'Success',
      message: 'Success',
      data: data[0],
    })
  } else {
    res.status(404).send({
      status: 'Not Found',
      message: `Activity with ID ${activityId} Not Found`,
      data: {},
    })
  }
})
/* Create Activity */
router.post('/', async function (req, res, next) {
  let title = req.body.title
  if (!title || title === null || title === undefined || title === '') {
    res.status(400).send({
      status: 'Bad Request',
      message: 'title cannot be null',
      data: {},
    })
  } else {
    let data = await Activity.add(req.body)
    // if (data.is_active == 1) {
    data.is_active = true
    // }
    res.status(201).send({
      status: 'Success',
      message: 'Success',
      data: data,
    })
  }
})

router.delete('/:activityId', async function (req, res, next) {
  let activityId = req.params.activityId
  let data = await Activity.get(activityId)

  if (data.length > 0) {
    let query = await Activity.delete(activityId)
    if (query) {
      res.send({
        status: 'Success',
        message: 'Success',
        data: {},
      })
    } else {
      res.status(404).send({
        status: 'Not Found',
        message: `Activity with ID ${activityId} Not Found`,
        data: {},
      })
    }
  } else {
    res.status(404).send({
      status: 'Not Found',
      message: `Activity with ID ${activityId} Not Found`,
      data: {},
    })
  }
})

router.patch('/:activityId', async function (req, res, next) {
  let activityId = req.params.activityId
  let title = req.body.title
  let data = await Activity.get(activityId)

  if (data.length > 0) {
    let query = await Activity.update(activityId, title)
    res.send({
      status: 'Success',
      message: 'Success',
      data: query,
    })
  } else {
    res.status(404).send({
      status: 'Not Found',
      message: `Activity with ID ${activityId} Not Found`,
      data: {},
    })
  }
})

module.exports = router
