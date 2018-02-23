require('app-module-path').addPath( __dirname );
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const expbs = require('express-handlebars');

var app = express();
// Require login module
const login = require('./lib/login-module');
login(app);

// Routes
const routes = require('./routes/login/index');
const users = require('./routes/login/users');
const index = require('./routes/login/index');
const upload = require('./routes/upload/upload');

// View Engine
app.set('views/login', path.join(__dirname, './views/login'));//
app.engine('handlebars', expbs({ defaultLayout: 'layout',
 layoutsDir: path.join(__dirname, './views/login/layouts')}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var allRoutesExceptLoginAndRegister = /^(?!^(\/users\/login$|\/users\/register$))/;
app.use(allRoutesExceptLoginAndRegister, login.authenticate);
app.use('/', routes);
app.use('/users', users);
app.use('/upload', upload);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('login/error');
});

module.exports = app;
