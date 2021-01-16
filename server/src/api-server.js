var express = require('express');
var apiServer = express()

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

var config_routes = require('./api/routes/config_routes');

var video_routes = require('./api/routes/video_routes');
var edgecontrol_routes = require('./api/routes/edgecontrol_routes');
var edgemeasurement_routes = require('./api/routes/edgemeasurement_routes');
var icebreaker_routes = require('./api/routes/icebreaker_routes');
var user_routes = require('./api/routes/user_routes');
var auth_routes = require('./api/routes/authcontroller_routes');
var health_check = require('./api/routes/health_check_routes');

var bubbles_queue = require('./api/models/bubbles_queue')

var router = express.Router();
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
//apiServer.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
apiServer.use("/api/edgecontrol", edgecontrol_routes);
apiServer.use("/api/measurement", edgemeasurement_routes);
apiServer.use("/api/icebreaker", icebreaker_routes);
//apiServer.use('/', index);

// catch 404 and forward to error handler
apiServer.use(function (req, res, next) {
    var err = new Error('Not Found');
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


var hostname = '0.0.0.0'
apiServer.listen(port, hostname, () => {
    console.log(`API server listening on ${hostname} ${port}.`)
});

var __queueClient

function setClient(client) {
    __queueClient = client;
}


var current_state = {
    "cabinet_settings": {
        "humidifier": true,
        "humidity_sensor": true,
        "external_humidity_sensor": true,
        "heater": true,
        "thermometer_top": true,
        "thermometer_middle": true,
        "thermometer_bottom": true,
        "external_thermometer": true,
        "thermometer_water": true,
        "water_pump": true,
        "air_pump": true,
        "light_sensor": true,
        "cabinet_door_sensor": true,
        "outer_door_sensor": true,
        "movement_sensor": true,
        "pressure_sensors": true,
        "root_ph_sensor": true,
        "enclosure_type": "Cabinet",
        "water_level_sensor": true,
        "tub_depth": 18.0,
        "tub_volume": 20.0,
        "intake_fan": true,
        "exhaust_fan": true,
        "enclosure_options": [
            "Cabinet",
            "Tent"
        ],
        "light_bloom": true,
        "light_vegetative": true,
        "light_germinate": true
    },
    "automation_settings": {
        "current_stage": "Germinate",
        "stage_options": [
            "Germinate",
            "Vegetative",
            "Bloom",
            "Harvest",
            "Dry",
            "Idle"
        ],
        "current_lighting_schedule": "12 on/12 off",
        "lighting_schedule_options": [
            "24 on",
            "18 on/6 off",
            "14 on/10 off",
            "12 on/12 off",
            "10 on/14 off",
            "6 on/18 off",
            "24 off"
        ],
        "light_on_start_hour": 10,
        "target_temperature": 75,
        "temperature_min": 60,
        "temperature_max": 90,
        "humidity_min": 0,
        "humidity_max": 90,
        "target_humidity": 70,
        "humidity_target_range_low": 75,
        "humidity_target_range_high": 85,
        "current_light_type": "Grow Light Veg",
        "light_type_options": [
            "Germinate",
            "Grow Light Veg",
            "Grow Light Bloom"
        ]
    },
    "status": {
        "units": "IMPERIAL",
        "temp_air_external": 65,
        "temp_air_external_direction": "up",
        "temp_air_top": 85,
        "temp_air_top_direction": "up",
        "temp_air_middle": 80,
        "temp_air_middle_direction": "up",
        "temp_air_bottom": 77,
        "temp_air_bottom_direction": "down",
        "temp_water": 70,
        "temp_water_direction": "down",
        "root_ph": 6.3,
        "root_ph_direction": "down",
        "humidity_internal": 44,
        "humidity_internal_direction": "up",
        "humidity_external": 43,
        "humidity_external_direction": "down",
        "plant_height": 37,
        "start_date_current_stage": "25 days ago",
        "start_date_next_stage": "10 days from now",
        "outer_door_open": false,
        "cabinet_door_open": false,
        "pressure_external": 1021,
        "pressure_internal": 1018,
        "date_last_training": "never",
        "date_last_filter_change": "never",
        "tub_water_level": 14.9
    },
    "application_settings": {},
    "switch_state": {
        "automaticControl": {
            "on": true
        },
        "humidifier": {
            "on": true
        },
        "heater": {
            "on": true
        },
        "airPump": {
            "on": true
        },
        "waterPump": {
            "on": true
        },
        "intakeFan": {
            "on": true
        },
        "exhaustFan": {
            "on": true
        },
        "currentGrowLight": {
            "on": false
        }
    }
};

module.exports = {
    app: apiServer
};

