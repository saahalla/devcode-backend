// const NodeCache = require('node-cache')
// const cache = new NodeCache({ stdTTL: 15 })

// const cacheActivity = (req, res, next) => {
//   try {
//     const { activityId } = req.params
//     if (cache.has(activityId)) {
//       return res.status(200).json(cache.get(activityId))
//     }
//     return next()
//   } catch (err) {
//     throw new Error(err)
//   }
// }

// const cacheTodo = (req, res, next) => {
//   try {
//     const { id } = req.params
//     if (cache.has(id)) {
//       return res.status(200).json(cache.get(id))
//     }
//     return next()
//   } catch (err) {
//     throw new Error(err)
//   }
// }

// const cache
// module.exports = cacheMiddleware
