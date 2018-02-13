require('app-module-path').addPath( __dirname );

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const expbs = require('express-handlebars');

// Flash req (for messages)
const session = require('express-session');
const flash = require('connect-flash');

var app = express();

var index = require('./routes/login/index');
var users = require('./routes/login/users');
let upload = require('./routes/upload/upload');

// Database req
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Database connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/loginapp');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// View Engine
app.set('views/login', path.join(__dirname, './views/login'));
app.engine('handlebars', expbs({ defaultLayout: 'layout',
 layoutsDir: path.join(__dirname, './views/login/layouts')}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use('/', index);
app.use('/users', users);
app.use('/upload', upload);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
