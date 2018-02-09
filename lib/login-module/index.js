const routes = require('./routes/index');
const users = require('./routes/users');

var getMarija = function () {//exports
    return {
        users: users
    };
}

var getRoutes = function () {
    return routes;
}

var getUsers = function () {
    return users;
}

var setRoutes = function (path='/') {
    app.use(path, routes);
}

var setUsers = function (path='/users') {
    app.use(path, users)
}

var init = function (app) {
    // Express req
    // const express = require('express');
     const expbs = require('express-handlebars');
    // const expressValidator = require('express-validator');
    // const session = require('express-session');
    // // Path req
     const path = require('path');

    // // Parsers req
    // const cookieParser = require('cookie-parser');
    // const bodyParser = require('body-parser');
    // // Flash req (for messages)
    // const flash = require('connect-flash');
    // // Passport req
    // const passport = require('passport');
    // const localStrategy = require('passport-local').Strategy;
    // // Database req
    // const mongo = require('mongodb');
    // const mongoose = require('mongoose');
    // mongoose.Promise = require('bluebird');

    // // Database connection
    // mongoose.Promise = global.Promise;
    // mongoose.connect('mongodb://localhost/loginapp');


    //const login = require('./lib/loginmaster')(app);
    //console.log(login);

    // Routes
    // const routes = require('./routes/index');
    //const routes = login.getRoutes();
    //const users = require('./routes/users');
    //const users = login.getUsers();


    // Start app
    //const app = express();

    // View Engine
    app.set('views', path.join(__dirname, './views'));
    app.engine('handlebars', expbs({ defaultLayout: 'layout',
     layoutsDir: path.join(__dirname, './views/layouts')}));
    app.set('view engine', 'handlebars');

    // BodyParser Middleware
    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(cookieParser());

    // // Express Session
    // app.use(session({
    //     secret: 'secret',
    //     saveUninitialized: true,
    //     resave: true
    // }));

    // // Passport Start
    // app.use(passport.initialize());
    // app.use(passport.session());

    // // Express Validator
    // app.use(expressValidator({
    // errorFormatter: function(param, msg, value) {
    //     var namespace = param.split('.')
    //     , root    = namespace.shift()
    //     , formParam = root;

    //     while(namespace.length) {
    //     formParam += '[' + namespace.shift() + ']';
    //     }
    //     return {
    //     param : formParam,
    //     msg   : msg,
    //     value : value
    //     };
    // }
    // }));

    // // Connect Flash
    // app.use(flash());

    // // Messages-g
    // app.use(function (req, res, next) {
    //     res.locals.success_msg = req.flash('success_msg');
    //     res.locals.error_msg = req.flash('error_msg');
    //     res.locals.error = req.flash('error');
    //     res.locals.user = req.user || null;
    // next();
    // });

    // // Routes
    // app.use('/', routes);
    // app.use('/users', users);

    // // Port setup
    // app.set('port', (process.env.PORT || 3000));

    // app.listen(app.get('port'), function(){
    //     console.log('Server started on port '+app.get('port'));
    // });

    // app.use(express.static(path.resolve('./public')));
}

module.exports = exports = function (app) {
   init(app);
    return {
        getRoutes,
        getUsers,
        setRoutes,
        setUsers,
        getMarija
    };
};

