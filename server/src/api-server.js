const express = require('express');
const apiServer = express()
const util = require("./util")

const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

global.__root   = __dirname + '/';

const config_routes = require('./api/routes/config_routes').router;
const video_routes = require('./api/routes/video_routes').router;
const edge_control_routes = require('./api/routes/edgecontrol_routes').router;
const edge_measurement_routes = require('./api/routes/edgemeasurement_routes').router;
const user_routes = require('./api/routes/user_routes').router;
const auth_routes = require('./api/routes/authcontroller_routes');
const health_check = require('./api/routes/health_check_routes').router;

const router = express.Router();

apiServer.locals = {};
apiServer.locals.config = require('./config/locals.js');
apiServer.locals.units = require('./api/services/formatted_units.js');

// view engine setup
apiServer.set('views', path.join(__dirname, 'views'));
apiServer.set('view engine', 'pug');

apiServer.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

const port  = util.normalizePort(process.env.PORT || '3000')

apiServer.use(bodyParser.urlencoded({
    extended: true
}));

apiServer.locals.moment = require('moment');
apiServer.locals.sprintf = require("sprintf-js").sprintf;
apiServer.locals.config = require('./config/locals.js');
apiServer.locals.units = require('./api/services/formatted_units.js');

// view engine setup
apiServer.set('views', path.join(__dirname, 'views'));
apiServer.set('view engine', 'pug');

// uncomment after placing your favicon in /public
apiServer.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
apiServer.use(logger('dev'));
apiServer.use(bodyParser.json());
apiServer.use(bodyParser.urlencoded({extended: false}));
apiServer.use(cookieParser());
apiServer.use(express.static(path.join(__dirname, 'public')));

apiServer.use('/api/config', config_routes);
apiServer.use('/api/healthcheck', health_check);
apiServer.use('/api/users', user_routes);
apiServer.use('/api/auth', auth_routes);
apiServer.use('/api/video', video_routes);
apiServer.use("/api/edgecontrol", edge_control_routes);
apiServer.use("/api/measurement", edge_measurement_routes);

// catch 404 and forward to error handler
apiServer.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
apiServer.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
//    res.render('error');
});

const hostname = '0.0.0.0'
apiServer.listen(port, hostname, () => {
    console.log(`API server listening on ${hostname} ${port}.`)
});

module.exports = {
    app: apiServer
};

