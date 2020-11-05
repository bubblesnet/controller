var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./api/api');

//var devicecontrol = require("./routes/devicecontrol");
var statusbyuserdevice = require('./routes/statusbyuserdevice');
var asyncstatusbyuserdevice = require('./routes/asyncstatusbyuserdevice');
var servepicture = require('./routes/servepicture');
var command = require('./routes/command');

var http = require('http'),
    fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require('mysql');

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.locals.moment = require('moment');
app.locals.sprintf = require("sprintf-js").sprintf;
app.locals.config = require('./conf/locals.js');
app.locals.units = require('./routes/units.js');

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

app.get("/status/:userid/:deviceid", statusbyuserdevice);
app.get("/asyncstatus/:userid/:deviceid", asyncstatusbyuserdevice);
app.get('/api/status/:userid/:deviceid', api);
app.get('/picture/:userid/:deviceid/:filename', servepicture);
app.get("/command/:userid/:deviceid/:outletname/:onoff", command);
app.get("/api/power/:userid/:deviceid/:outletname/:onoff", api);
app.use('/', index);
app.use('/users', users);

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


module.exports = app;
