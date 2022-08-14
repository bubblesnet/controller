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


let temperature_low, temperature_high, temperature_units
let humidity_low,humidity_high, humidity_units
let pH_low, pH_high, pH_units
let water_level_low, water_level_high, water_level_units

// copyright and license inspection - no issues 4/13/22


function within_range(low,high,units,value, value_units ) {
    //
    if( units !== value_units ) {
        // convert
    }
    return( true )
}

function alert_service_callback(body) {
    log.info("Alert service analyzing message " + JSON.stringify(body))

    // are environmental measurements out-of-range?
    // temperature, humidity, water level, pH, light
    // If yes, push an alert onto the array
    switch( body.measurement_type ) {

        case 'temperature_middle': {
            if (!within_range(temperature_low, temperature_high, temperature_units, body.float_value, body.units)) {
                // do something
                // is there a mitigation (heat/cool) that we can apply?
                break;
            } else {
                // is there an existing alert that this cancels?
            }
            return
        }
        case 'humidity_internal': {
            if (!within_range(humidity_low,humidity_high, humidity_units, body.float_value, body.units)) {
                // do something
                // is there a mitigation (heat/cool) that we can apply?
                break;
            } else {
                // is there an existing alert that this cancels?
            }
            return;
        }
        case 'pH': {
            if (!within_range(pH_low, pH_high, pH_units, body.float_value, body.units)) {
                // do something
                // is there a mitigation (heat/cool) that we can apply?
                break;
            } else {
                // is there an existing alert that this cancels?
            }
            return;
        }
        case 'light_internal': {
            // if any grow light is ON but light < minimum, that's an alert
            return;
        }
        case 'water_level': {
            if (!within_range(water_level_low, water_level_high, water_level_units, body.float_value, body.units)) {
                // do something
                break;
            } else {
                // is there an existing alert that this cancels?
            }
            return;
        }
        default: {
            break;
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