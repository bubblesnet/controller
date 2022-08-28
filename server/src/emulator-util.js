/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */



const util = require("./util")

const axios = require('axios')
const bubbles_queue = require("./api/models/bubbles_queue")
const {ph_units, co2_units, voc_units, pressure_units, light_units, humidity_units, directions, temperature_units, sensor_name, measurement_name, message_type, measurement_type, liquid_volume_units} = require("./types");
let current_state = {}
const log = require("./bubbles_logger").log

function sendAllFakeMeasurements() {
    for( let i = 0; i < 15; i++ ) {
        let z = getFakeMeasurement1(i)
        sendMeasurement(z)
    }
}

function getFakeMeasurement1(x) {

    let timestamp = Date.now()
    let l_value = util.getRandomInt(2000)
    let f_value = 20 + util.getRandomInt(79)
    let c_value = (f_value - 32.0) / 1.8
    let wlf_value = 1.0 + util.getRandomInt(11) + (util.getRandomInt(9)/10.0)
    let plf_value = 900 +  util.getRandomInt(300) + (util.getRandomInt(9)/10.0)
    let phf_value = 4.0 + util.getRandomInt(4)  + (util.getRandomInt(9)/10.0)

    let deviceid = 70000008
    let stationid = 1
    let siteid = 1

    let direction = directions.none
    let b = (util.getRandomInt(9)%2 === 0)
    if( b ) {
        direction = directions.up
    } else {
        direction = directions.down
    }

    let z = {
        message_type: message_type.measurement,
        deviceid: deviceid,
        stationid: stationid,
        siteid: siteid,
        executable_version: "9.9.10"
    }

    // z.measurement_type,z.sensor_name,z.measurement_name, z.value,z.units
    switch (x) {
        case 0:  // external pressure
            z.sample_timestamp = timestamp
            z.sensor_name = sensor_name.co2_sensor
            z.measurement_name = measurement_name.co2
            z.units = co2_units.ppb
            z.value = plf_value
            z.floatvalue = plf_value
            z.value_name = measurement_name.co2
            z.direction = direction
            z.co2_direction = direction
            z.co2 = plf_value
            z.container_name = "sense-go"
            break;
        case 1:  // external pressure
            z.sample_timestamp = timestamp
            z.sensor_name = sensor_name.voc_sensor
            z.measurement_name = measurement_name.voc
            z.units = voc_units.ppm
            z.value = plf_value
            z.floatvalue = plf_value
            z.value_name = measurement_name.voc
            z.direction = direction
            z.voc_direction = direction
            z.voc = plf_value
            z.container_name = "sense-go"
            break;

        case 2:  // light_internal
            z.sample_timestamp = timestamp
            z.sensor_name = sensor_name.light_sensor_internal
            z.measurement_name = measurement_name.light_internal
            z.units = light_units.lux
            z.value = l_value
            z.light_internal = l_value
            z.floatvalue = l_value
            z.value_name = measurement_name.light_internal
            z.direction = direction
            z.temp_air_external_direction = direction
            z.container_name = "sense-go"
            break;
        case 3: // light external
            z.sample_timestamp = timestamp
            z.sensor_name = sensor_name.light_sensor_external
            z.measurement_name = measurement_name.light_external
            z.units = light_units.lux
            z.value = l_value
            z.light_external = l_value
            z.floatvalue = l_value
            z.value_name = measurement_name.light_external
            z.direction = direction
            z.temp_air_external_direction = direction
            z.container_name = "sense-go"
            break;
        case 4: // temp external
            z.sample_timestamp = timestamp
            z.sensor_name = sensor_name.thermometer_external
            z.measurement_name = measurement_name.temp_air_external
            z.units = temperature_units.fahrenheit
            z.value = f_value
            z.temp_air_external = f_value
            z.floatvalue = f_value
            z.value_name = measurement_name.temp_air_external
            z.direction = direction
            z.temp_air_external_direction = direction
            z.tempC = c_value
            z.tempF = f_value
            z.container_name = "sense-python"
            break;
        case 5: // temp middle
            z.sample_timestamp = timestamp
            z.sensor_name = sensor_name.thermometer_middle
            z.measurement_name = measurement_name.temp_air_middle
            z.units = temperature_units.fahrenheit
            z.value = f_value
            z.temp_air_middle = f_value
            z.floatvalue = f_value
            z.value_name = measurement_name.temp_air_middle
            z.direction = direction
            z.temp_air_middle_direction = direction
            z.tempC = c_value
            z.tempF = f_value
            z.container_name = "sense-python"
            break;
        case 6: // temp_bottom
            z.sample_timestamp = timestamp
            z.sensor_name = sensor_name.thermometer_bottom
            z.measurement_name = measurement_name.temp_air_bottom
            z.units = temperature_units.fahrenheit
            z.value = f_value
            z.temp_air_bottom = f_value
            z.floatvalue = f_value
            z.value_name = measurement_name.temp_air_bottom
            z.direction = direction
            z.temp_air_bottom_direction = direction
            z.tempC = c_value
            z.tempF = f_value
            z.container_name = "sense-python"
            break;
        case 7: // temp_top
            z.sample_timestamp = timestamp
            z.sensor_name = sensor_name.thermometer_top
            z.measurement_name = measurement_name.temp_air_top
            z.units = temperature_units.fahrenheit
            z.value = f_value
            z.temp_air_external = f_value
            z.floatvalue = f_value
            z.value_name = measurement_name.temp_air_top
            z.direction = direction
            z.temp_air_external_direction = direction
            z.tempC = c_value
            z.tempF = f_value
            z.container_name = "sense-python"
            break;
        case 8: // temp_water
            z.sample_timestamp = timestamp
            z.sensor_name = sensor_name.thermometer_water
            z.measurement_name = measurement_name.temp_water
            z.units = temperature_units.fahrenheit
            z.value = f_value
            z.temp_water = f_value
            z.floatvalue = f_value
            z.value_name = measurement_name.temp_water
            z.direction = direction
            z.temp_water_direction = direction
            z.tempC = c_value
            z.tempF = f_value
            z.container_name = "sense-go"
            break;
        case 9:  // humidity_internal
            z.sample_timestamp = timestamp
            z.sensor_name = sensor_name.humidity_sensor_internal
            z.measurement_name = measurement_name.humidity_internal
            z.units = humidity_units.percent
            z.value = f_value
            z.humidity_internal = f_value
            z.floatvalue = f_value
            z.value_name = measurement_name.humidity_internal
            z.direction = direction
            z.humidity_internal_direction = direction
            z.container_name = "sense-python"
            break;
        case 10:  // water_level
            z.sample_timestamp = timestamp
            z.sensor_name = sensor_name.water_level_sensor
            z.measurement_name = measurement_name.water_level
            z.units = liquid_volume_units.gallons
            z.value = wlf_value
            z.floatvalue = wlf_value
            z.value_name = measurement_name.water_level
            z.direction = direction
            z.water_level_direction = direction
            z.water_level = wlf_value
            z.container_name = "sense-go"
            break;
        case 11:  // humidity_external
            z.sample_timestamp = timestamp
            z.sensor_name = sensor_name.humidity_sensor_external
            z.measurement_name = measurement_name.humidity_external
            z.units = humidity_units.percent
            z.value = f_value
            z.humidity_external = f_value
            z.floatvalue = f_value
            z.value_name = measurement_name.humidity_external
            z.direction = direction
            z.humidity_external_direction = direction
            z.container_name = "sense-python"
            break;
        case 12:  // internal pressure
            z.sample_timestamp = timestamp
            z.sensor_name = sensor_name.pressure_internal
            z.measurement_name = measurement_name.pressure_internal
            z.units = pressure_units.hg
            z.value = plf_value
            z.floatvalue = plf_value
            z.value_name = measurement_name.pressure_internal
            z.direction = direction
            z.pressure_internal_direction = direction
            z.pressure_internal = plf_value
            z.container_name = "sense-python"
            break;
        case 13:  // external pressure
            z.sample_timestamp = timestamp
            z.sensor_name = sensor_name.pressure_external
            z.measurement_name = measurement_name.pressure_external
            z.units = pressure_units.hg
            z.value = plf_value
            z.floatvalue = plf_value
            z.value_name = measurement_name.pressure_external
            z.direction = direction
            z.pressure_external_direction = direction
            z.pressure_external = plf_value
            z.container_name = "sense-python"
            break;
        case 14:  // external pressure
            z.sample_timestamp = timestamp
            z.sensor_name = sensor_name.root_ph_sensor
            z.measurement_name = measurement_name.root_ph
            z.units = ph_units.default
            z.value = phf_value
            z.floatvalue = phf_value
            z.value_name = measurement_name.root_ph
            z.direction = direction
            z.root_ph_direction = direction
            z.root_ph = phf_value
            z.container_name = "sense-go"
            break;
        default:
            break;
    }
    log.info("MESSAGE = " + JSON.stringify(z))
    return (z);
}

function getFakeStatus() {
//    let current_state = {status: {}}
    let current_state = require('../src/initial_state.json')

    current_state.status.humidity_internal = 60 + util.getRandomInt(30)
    let x = util.getRandomInt(2);
    if(x == 0 )
        current_state.status.temp_air_middle_direction = directions.none
    else if (x == 1)
        current_state.status.temp_air_middle_direction = directions.down
    else
        current_state.status.temp_air_middle_direction = directions.up

    current_state.status.temp_air_top = 60 + util.getRandomInt(39)
    current_state.status.temp_air_middle = 50 + util.getRandomInt(49)
    current_state.status.temp_air_bottom = 40 + util.getRandomInt(49)
    return( current_state )
}

let server_ports = util.get_server_ports_for_environment(process.env.NODE_ENV)
let api_server_port = server_ports.api_server_port
let websocket_server_port = server_ports.websocket_server_port

function sendTextToAPI(msg) {
    let url = "http://"+server_ports.api_server_host+":"+api_server_port+"/api/measurement/90000009/70000008"

    axios
        .post(url, msg)
        .then(res => {
            log.info(`statusCode: ${res.status}`)
//            log.info(res)
        })
        .catch(error => {
            log.error(error)
        })

}

function sendFakeMeasurement(singleCall) {
    sendAllFakeMeasurements()
    if( !singleCall ) { /// TODO this duplicates timeout up one level
        setTimeout(() => {
            sendAllFakeMeasurements()
        }, 15000);
    }
}
/*
function sendFakeStatus() {
    current_state = emulator_util.getFakeStatus()
    log.info("Sending humidity " + current_state.status.humidity_internal)
    sendText(current_state)
    setTimeout(() => {
        sendFakeStatus()
    }, 10000);

}
*/


function sendMeasurement(msg) {
    log.info("sendFakeMeasurement")

    msg.sample_timestamp = Date.now = () => new Date().getTime();
    log.info("Sending message to API " + JSON.stringify(msg))
    sendTextToAPI(msg)
    log.info("end sendFakeMeasurement")
}

function sendFakeMeasurementToTopic(client) {
    log.info("sendFakeMeasurementToTopic")
    const sendHeaders = {
        'destination': '/topic/bubbles_ui',
        'content-type': 'text/plain'
    };

    let msg = getFakeMeasurement()
    log.info("Sending message to topic " + JSON.stringify(msg))
    bubbles_queue.sendMessageToTopic(client,sendHeaders, JSON.stringify(msg))
    return(msg)

}

function sendFakeStatusToQueue(client) {
    log.info("sendFakeStatusToQueue")
    current_state = getFakeStatus()
    log.info("Sending humidity " + current_state.status.humidity_internal)
//    if (bubbles_queue.__stompClient != null) {
    log.info("sending message to topic")
    bubbles_queue.sendMessageToQueue(client,JSON.stringify(current_state))
//    }
    setTimeout(() => {
        sendFakeStatusToQueue()
    }, 10000);
    return( current_state )

}

function sendFakeStatusToTopic(client) {
    const sendHeaders = {
        'destination': '/topic/bubbles_ui',
        'content-type': 'text/plain'
    };

    log.info("sendFakeStatusToTopic")
    log.info("sending message to topic")
    current_state = getFakeStatus()
    bubbles_queue.sendMessageToTopic(client,sendHeaders, JSON.stringify(current_state))
    setTimeout(() => {
        sendFakeStatusToTopic()
    }, 10000);
    return(current_state)
}


function sendFakeMeasurement(singleCall) {
    let z = 1
    sendAllFakeMeasurements()
    if( !singleCall ) { /// TODO this duplicates timeout up one level
        setTimeout(() => {
            sendFakeMeasurement(singleCall)
        }, 30000);
    }
    return(z)
}

module.exports = {
    sendAllFakeMeasurements: sendAllFakeMeasurements,
    getFakeStatus: getFakeStatus,
    sendTextToAPI,
    sendFakeMeasurement,
    sendMeasurement,
    sendFakeMeasurementToTopic,
    sendFakeStatusToTopic,
    sendFakeStatusToQueue
}