var express = require('express');
var app = express()

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const path = require('path');
var locals = require('./config/locals');
var fs = require('fs');
var db = require('./api/models/icebreaker_db');
const disk = require('diskspace');
var sprintf = require('sprintf-js').sprintf;

var htmlDecode = require("js-htmlencode").htmlDecode;

global.__root   = __dirname + '/';

var video_routes = require('./api/routes/video_routes');
var edgecontrol_routes = require('./api/routes/edgecontrol_routes');
var icebreaker_routes = require('./api/routes/icebreaker_routes');
var user_routes = require('./api/routes/user_routes');
var auth_routes = require('./api/routes/authcontroller_routes');

var router = express.Router();
app.locals = {};
app.locals.config = require('./config/locals.js');
app.locals.units = require('./api/services/formatted_units.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

const port  = normalizePort(process.env.PORT || '3000')

const testrun_model = require('./api/models/icebreaker/testrun_model')
const devicestatus_model = require('./api/models/icebreaker/devicestatus_model')
const metrics_model = require('./api/models/icebreaker/metrics_model')
const sbc_model = require('./api/models/icebreaker/sbc_model')
const testqueue_model = require('./api/models/icebreaker/testqueue_model')

var http = require('http'),
    fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require('mysql');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.locals.moment = require('moment');
app.locals.sprintf = require("sprintf-js").sprintf;
app.locals.config = require('./config/locals.js');
app.locals.units = require('./api/services/formatted_units.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', user_routes);
app.use('/api/auth', auth_routes);
app.use('/api/video', video_routes);
app.use("/api/edgecontrol", edgecontrol_routes);
app.use("/api/icebreaker", icebreaker_routes);
//app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

module.exports = {
    app: app
};

