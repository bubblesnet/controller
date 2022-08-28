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

const log = require("./bubbles_logger").log
const measurement_type = require("./types").measurement_type

let temperature_low, temperature_high, temperature_units
let water_temperature_low, water_temperature_high, water_temperature_units
let humidity_low,humidity_high, humidity_units
let pH_low, pH_high, pH_units
let water_level_low, water_level_high, water_level_units
let co2_low, co2_high, co2_units
let voc_low, voc_high, voc_units

// copyright and license inspection - no issues 4/13/22


function within_range(low,high,display_units,value, value_units ) {
    //
    if( display_units !== value_units ) {
        // convert
    }
    if (value <= high && value >= low) {
        return( true )
    }
    return( true )
}

function alert_service_callback(body) {
    log.info("Alert service analyzing message " + JSON.stringify(body))

    // are environmental measurements out-of-range?
    // temperature, humidity, water level, pH, light
    // If yes, push an alert onto the array
    switch( body.measurement_type ) {
        case measurement_type.temperature_middle: {
            generateHiLowAlertIfAppropriate( station.thermometer_middle, temperature_low, temperature_high, body.float_value, temperature_units, body.units )
            break;
        }
        case measurement_type.humidity_internal: {
            generateHiLowAlertIfAppropriate( station.humidity_sensor_internal, humidity_low, humidity_high, body.float_value, humidity_units, body.units )
            break;
        }
        case measurement_type.pH: {
            generateHiLowAlertIfAppropriate( station.root_ph_sensor, pH_low, pH_high, body.float_value, pH_units, body.units )
            break;
        }
        case measurement_type.light_internal: {
            if( !station.light_internal ) {
                break
            }
            // if any grow light is ON but light < minimum, that's an alert
            return;
        }
        case measurement_type.water_level: {
            generateHiLowAlertIfAppropriate( station.water_level_sensor, water_level_low, water_level_high, body.float_value, water_level_units, body.units )
            break;
        }
        case measurement_type.water_temperature: {
            generateHiLowAlertIfAppropriate( station.thermometer_water, water_temperature_low, water_temperature_high, body.float_value, water_temperature_units, body.units )
            break;
        }
        case measurement_type.co2: {
            generateHiLowAlertIfAppropriate( station.co2_sensor, co2_low, co2_high, body.float_value, co2_units, body.units )
            break;
        }
        case measurement_type.voc: {
            generateHiLowAlertIfAppropriate( station.voc_sensor, voc_low, voc_high, body.float_value, voc_units, body.units )
            break;
        }
        default: {
            break;
        }
    }

    function generateHiLowAlertIfAppropriate( presence, lo, hi, value, display_units, device_units ) {
        if( !presence ) {
            return
        }
        if (!within_range(lo, hi, display_units, value, device_units)) {
            // do something
            // has this condition persisted longer than configurable time
            return;
        } else {
            // is there an existing alert that this cancels?
        }
    }

    // is this an event that, by itself triggers a notification?
    // door_open, door_close, movement,

    // for each alert in the array
        // are we already in an alert state for this condition?
        // if yes, delete it

}


module.exports = {
    alert_service_callback
}