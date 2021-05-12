const express = require('express');
const apiServer = express()

// Allow cross origin access.
const cors = require('cors')
apiServer.use(cors());

const util = require("./util")
const logger = require("./bubbles_logger").log
const fileUpload = require('express-fileupload');

const favicon = require('serve-favicon');
const morgan_logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

global.__root   = __dirname + '/';

const config_routes = require('./api/routes/config_routes').router;
const device_routes = require('./api/routes/device_routes').router;
const video_routes = require('./api/routes/video_routes').router;
const edge_control_routes = require('./api/routes/edgecontrol_routes').router;
const edge_measurement_routes = require('./api/routes/edgemeasurement_routes').router;
const user_routes = require('./api/routes/user_routes').router;
const auth_routes = require('./api/routes/authcontroller_routes').router;
const station_routes = require('./api/routes/station_routes').router;
const health_check = require('./api/routes/health_check_routes').router;

logger.info("starting router")
const router = express.Router();
logger.silly("after router")
apiServer.locals = {};
apiServer.locals.config = require('./config/locals.js');
logger.log('silly',"after locals")
apiServer.locals.units = require('./api/services/formatted_units.js');

// view engine setup
apiServer.set('views', path.join(__dirname, 'views'));
apiServer.set('view engine', 'pug');

ports = util.get_server_ports_for_environment( process.env.NODE_ENV )

apiServer.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

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

apiServer.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
apiServer.use(morgan_logger('dev'));
apiServer.use(bodyParser.json());
apiServer.use(bodyParser.urlencoded({extended: false}));
apiServer.use(cookieParser());
apiServer.use(express.static(path.join(__dirname, 'public')));

apiServer.use('/api/config', config_routes);
apiServer.use('/api/healthcheck', health_check);
apiServer.use('/api/users', user_routes);
apiServer.options('/api/auth', cors()) // enable pre-flight requests
apiServer.use('/api/auth', auth_routes);

apiServer.use('/api/device', device_routes);
apiServer.use('/api/video', video_routes);
apiServer.use("/api/edgecontrol", edge_control_routes);
apiServer.use("/api/measurement", edge_measurement_routes);
apiServer.use("/api/station", station_routes);

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



let listening = false

const hostname = '0.0.0.0'
let runningServer = apiServer.listen(ports.api_server_port, hostname, () => {
    logger.log('info',`API server listening on ${hostname} ${ports.api_server_port}.`)
    listening = true
});

function close() {
    let ret
    runningServer.close( function(err) {
        if (typeof err !== 'undefined') {
            logger.error('close error! ' + err)
            ret = err
        } else {
            logger.info('server closed')
        }
    })
    return(ret);
}


module.exports = {
    listening,
    runningServer,
    close,
    app: apiServer
};

