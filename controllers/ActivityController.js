let __activity = require('../class/activity.class')
let Activity = new __activity()

let getAllActivity = async function (req, res, next) {
  let data = Activity.getAll().then((data) => {
    res.json({
      status: 'Success',
      message: 'Success',
      data: data,
    })
  })
}

let getActivity = async function (req, res, next) {
  let activityId = req.params.activityId
  let data = Activity.get(activityId).then((data) => {
    if (data.length > 0) {
      res.json({
        status: 'Success',
        message: 'Success',
        data: data[0],
      })
    } else {
      res.status(404).json({
        status: 'Not Found',
        message: `Activity with ID ${activityId} Not Found`,
        data: {},
      })
    }
  })
}

let createActivity = async function (req, res, next) {
  let title = req.body.title
  if (!title || title === null || title === undefined || title === '') {
    res.status(400).json({
      status: 'Bad Request',
      message: 'title cannot be null',
      data: {},
    })
  } else {
    let data = Activity.add(req.body).then((data) => {
      res.status(201).json({
        status: 'Success',
        message: 'Success',
        data: data,
      })
    })
  }
}

let deleteActivity = async function (req, res, next) {
  let activityId = req.params.activityId
  let data = await Activity.get(activityId)

  if (data.length > 0) {
    let query = Activity.delete(activityId).then((data) => {
      res.json({
        status: 'Success',
        message: 'Success',
        data: {},
      })
    })
    // if (query) {
    //   res.json({
    //     status: 'Success',
    //     message: 'Success',
    //     data: {},
    //   })
    // } else {
    //   res.status(404).json({
    //     status: 'Not Found',
    //     message: `Activity with ID ${activityId} Not Found`,
    //     data: {},
    //   })
    // }
  } else {
    res.status(404).json({
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
    let query = Activity.update(activityId, title).then((data) => {
      res.json({
        status: 'Success',
        message: 'Success',
        data: data,
      })
    })
  } else {
    res.status(404).json({
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
