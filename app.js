require('app-module-path').addPath( __dirname );
var helmet = require('helmet');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const expbs = require('express-handlebars');
const fs = require('fs');
const cors = require('cors');

var app = express();

app.use(helmet.hsts({
  maxAge: 5184000,
  includeSubDomains: true,
  preload: true,
  setIf: function (req, res) {
    return req.secure || (req.headers['x-forwarded-proto'] === 'https')
  }
}));

app.use(cors());

// Require login module
const login = require('./lib/login-module');
login(app);

// Routes
const routes = require('./routes/login/index');
const users = require('./routes/login/users');
const index = require('./routes/login/index');
const upload = require('./routes/upload/upload');
const entityList = require('./routes/entity-list');
const api = require('./routes/api');

// View Engine
app.set('views/login', path.join(__dirname, './views/login'));//
app.engine('handlebars', expbs({ defaultLayout: 'layout',
 layoutsDir: path.join(__dirname, './views/login/layouts')}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//log requests to a file
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
app.use(logger('common', {stream: accessLogStream}));

//log requests to a console
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/upload', upload);
app.use('/entities', entityList);
app.use('/api', api);

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
