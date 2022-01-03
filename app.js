let express = require('express')
let Env = require('dotenv').config()
// let path = require('path')
let cookieParser = require('cookie-parser')
// let logger = require('morgan')
let compression = require('compression')
let cors = require('cors')
let dbmigrate = require('db-migrate')

let indexRouter = require('./routes/index')
let activityGroupsRouter = require('./routes/activity-groups')
let todoItemsRouter = require('./routes/todo-items')

let dbm = dbmigrate.getInstance(true)
dbm.sync('20211223150835').then(function () {
  //   console.log('successfully migrated up')
  return
})

let app = express()
app.use(compression())
app.use(cors())
// app.use(logger('dev'))
app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/activity-groups', activityGroupsRouter)
app.use('/todo-items', todoItemsRouter)

module.exports = app
