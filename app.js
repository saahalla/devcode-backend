var express = require('express');
var Env = require('dotenv').config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
let activityGroupsRouter = require('./routes/activity-groups');
let todoItemsRouter = require('./routes/todo-items');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/activity-groups', activityGroupsRouter);
app.use('/todo-items', todoItemsRouter);

module.exports = app;
