var express = require('express')
var Env = require('dotenv').config()
var path = require('path')
var cookieParser = require('cookie-parser')
// var logger = require('morgan')
var compression = require('compression')

var indexRouter = require('./routes/index')
let activityGroupsRouter = require('./routes/activity-groups')
let todoItemsRouter = require('./routes/todo-items')
var cors = require('cors')
let dbmigrate = require('db-migrate')

let dbm = dbmigrate.getInstance(true)
dbm.sync('20211223150835').then(function () {
  //   console.log('successfully migrated up')
  return
})

var app = express()
app.use(compression())
app.use(cors())
// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/activity-groups', activityGroupsRouter)
app.use('/todo-items', todoItemsRouter)

module.exports = app
