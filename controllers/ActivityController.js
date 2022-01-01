let __activity = require('../class/activity.class')
let Activity = new __activity()
const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 15 })

let getAllActivity = async function (req, res, next) {
  let data = await Activity.getAll()

  res.send({
    status: 'Success',
    message: 'Success',
    data: data,
  })
}

let getActivity = async function (req, res, next) {
  let activityId = req.params.activityId
  let data = await Activity.get(activityId)

  // console.log('cache getActivity ===', cache.get('getActivity' + activityId))
  if (cache.has('getActivity' + activityId)) {
    res.send({
      status: 'Success',
      message: 'Success',
      data: cache.get('getActivity' + activityId),
    })
  } else {
    if (data.length > 0) {
      cache.set('getActivity' + activityId, data[0])
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
  }
}

let createActivity = async function (req, res, next) {
  let title = req.body.title
  if (!title || title === null || title === undefined || title === '') {
    res.status(400).send({
      status: 'Bad Request',
      message: 'title cannot be null',
      data: {},
    })
  } else {
    let data = await Activity.add(req.body)
    res.status(201).send({
      status: 'Success',
      message: 'Success',
      data: data,
    })
  }
}

let deleteActivity = async function (req, res, next) {
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
}

let updateActivity = async function (req, res, next) {
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
}

module.exports = {
  getAllActivity,
  getActivity,
  createActivity,
  deleteActivity,
  updateActivity,
}
