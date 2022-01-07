let express = require('express')
let Env = require('dotenv').config()
let cookieParser = require('cookie-parser')
let compression = require('compression')
let cors = require('cors')
let dbmigrate = require('db-migrate')

let indexRouter = require('./routes/index')
let activityGroupsRouter = require('./routes/activity-groups')
let todoItemsRouter = require('./routes/todo-items')
/* test */
let __mysql = require('./class/mysql.class')
let Db = new __mysql()
Db.connect()

let dbm = dbmigrate.getInstance(true)
dbm.sync('20211223131300').then(function () {
  return
})

let app = express()
app.use(compression())
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/activity-groups', activityGroupsRouter)
app.use('/todo-items', todoItemsRouter)

module.exports = app
