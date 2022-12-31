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

//*********************************************  WARNING **************************************/
/*
This file MUST MUST MUST be replicated in the server and client source hierarchies
 */

const measurement_name = {
    temp_air_top: "temp_air_top",
    temp_air_middle: "temp_air_middle",
    temp_air_bottom: "temp_air_bottom",
    temp_air_external: "temp_air_external",
    temp_water: "temp_water",
    humidity_internal: "humidity_internal",
    humidity_external: "humidity_external",
    water_level: "water_level",
}


const measurement_type = {
    temperature_middle: 'temperature_middle',
    humidity_internal: 'humidity_internal',
    pH: 'pH',
    light_internal: 'light_internal',
    water_level: 'water_level',
    water_temperature: 'water_temperature',
    co2: 'co2',
    voc: 'voc',

    /// emulator types - not all valid?
    temperature: 'temperature',
    humidity: 'humidity',
    level: 'level'
}

const message_type = {
    measurement: 'measurement',
    switch_event: 'switch_event',
    dispenser_event: 'dispenser_event',
    picture_event: 'picture_event',
    // CLIENT ADDED
    event: 'event',
}

const directions = {
    up: 'up',
    down: 'down',
    none: ''
}

const sensor_name = {
    thermometer_top: "thermometer_top",
    thermometer_middle: "thermometer_middle",
    thermometer_bottom: "thermometer_bottom",
    thermometer_external: "thermometer_external",
    thermometer_water: "thermometer_water",
    humidity_sensor_internal: "humidity_sensor_internal",
    humidity_sensor_external: "humidity_sensor_external",
    water_level_sensor: "water_level_sensor",

    // CLIENT ADDED
    light_sensor_internal: "light_sensor_internal",
    light_sensor_external: "light_sensor_external",
    station_door_sensor: "station_door_sensor",
    outer_door_sensor: "outer_door_sensor",
    root_ph_sensor: "root_ph_sensor",
    height_sensor: "height_sensor",
    voc_sensor: "voc_sensor",
    co2_sensor: "co2_sensor",
    ec_sensor: "ec_sensor",
    movement_sensor: "movement_sensor",
    pressure_sensors: "pressure_sensors"
}

const ac_device_name = {
    humidifier: "humidifier",
    water_heater: "water_heater",
    heater: "heater",
    water_pump: "water_pump",
    air_pump: "air_pump",
    intake_fan: "intake_fan",
    exhaust_fan: "exhaust_fan",
    heat_lamp: "heat_lamp",
    heating_pad: "heating_pad",
    light_bloom: "light_bloom",
    light_vegetative: "light_vegetative",
    light_germinate: "light_germinate",

}
const temperature_units = {
    fahrenheit: "F",
    celsius: "C",
    kelvin: "K"
}

const humidity_units = {
    percent: "%"
}

const liquid_volume_units = {
    gallons: "gallons",
    ounces: "oz",
    liters: "liters",
    milliliters: "ml",
}

// CLIENT ADDED
const switch_name = {
    growLight: "growLight",
    lightBloom: "lightBloom",

}

module.exports = {
    measurement_name,
    measurement_type,
    message_type,
    directions,
    sensor_name,
    temperature_units,
    humidity_units,
    liquid_volume_units,
    ac_device_name,
    switch_name,
}
