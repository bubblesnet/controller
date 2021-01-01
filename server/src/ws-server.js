global.__root   = __dirname + '/';

var bubbles_queue = require('./api/models/bubbles_queue')
// var feeder = require('./topic-feeder-emulator');
var ws = require("nodejs-websocket")
var connection
var __queueClient

const SWITCH_COMMAND="switch"
const STATUS_COMMAND="status"

function setClient(client) {
    __queueClient = client;
}

const serveUIWebSockets = async() => {
    console.log("emulateStatusChanges")
    console.log("subscribe to activemq ui topic")
    bubbles_queue.init(setClient).then( value => {
        console.log("bubbles_queue.init succeeded, subscribing");
        bubbles_queue.subscribeToTopic(__queueClient, function (body) {
            if( typeof(connection) === 'undefined' ) {
                console.log("no UI clients. yet")
            } else if (connection === null ) {
                console.log("had a UI client but he closed out and nulled")
            }
             else if( connection.readyState !== connection.OPEN) {
                console.log("had a UI client but he closed out (crashed?)")
            } else {
                console.log("UI client is initialized and OPEN, sending")
                connection.sendText(body)
            }
        });
    }, reason => {
        console.log("bubbles_queue.init failed "+reason)
    });

    console.log("Websocket server listening on 8001")
    var server = ws.createServer(function (conn) {
        connection = conn
        conn.on("connect", function () {
            console.log("New connection")
            connection = conn
        })
        conn.on("text", function (str) {
            let x = JSON.parse(str)
            if (x.command === SWITCH_COMMAND) {
                console.log("Received switch command " + str)
            } else if (x.command === STATUS_COMMAND) {
                console.log("Received status command " + str)
                conn.sendText(JSON.stringify(current_state))
            } else {
                console.log("Echoing received state " + JSON.stringify(x))
                current_state = x
                conn.sendText(JSON.stringify(current_state))
            }
        })
        conn.on("close", function (code, reason) {
            console.log("Connection closed")
            connection = null;
        })
    }).listen(8001)
}

var current_state = {
    "display_settings": {
        "units": "METRIC",
        "language": "en-us",
        "languageOptions": [
            "en-us",
            "fr"
        ],
        "theme": "",
        "current_font": "Aclonica",
        "units_options": [
            "IMPERIAL",
            "METRIC"
        ],
        "tub_volume_units": "gallons",
        "tub_depth_units": "inches",
        "plant_height_units": "inches",
        "humidity_units": "%",
        "temperature_units": "F",
        "pressure_units": "hPa",
        "pressure_units_options": [
            "hPa",
            "mbar",
            "mm Hg",
            "psi"
        ]
    },
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
            "on": true
        }
    }
};

// noinspection JSIgnoredPromiseFromCall
serveUIWebSockets();
