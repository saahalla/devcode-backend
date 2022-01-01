var express = require('express')
var router = express.Router()
let ActivityController = require('../controllers/ActivityController')

router.get('/', ActivityController.getAllActivity)
router.get('/:activityId', ActivityController.getActivity)
router.post('/', ActivityController.createActivity)
router.delete('/:activityId', ActivityController.deleteActivity)
router.patch('/:activityId', ActivityController.updateActivity)

module.exports = router
