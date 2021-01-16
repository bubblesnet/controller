var express = require('express');
var router = express.Router();
const bubbles_queue = require('../models/bubbles_queue')

let __edgeMeasurementClient

/**
 * @api {post} /measurement/:userid/:deviceid Get the last reported status from specified device
 * @apiName GetStatus
 * @apiGroup Measurement
 *
 * @apiParam {Number} userid User's unique ID.
 * @apiParam {Number} deviceid Device's unique ID.
 *
 * @apiSuccess {XXXX} XXXX XXXX
 */
const config = {
    automation_settings: {
        current_stage: "Germinate",
        stage_options: [
            "Germinate",
            "Vegetative",
            "Bloom",
            "Harvest",
            "Dry",
            "Idle"
        ],
        current_lighting_schedule: "12 on/12 off",
        "lighting_schedule_options": [
            "24 on",
            "18 on/6 off",
            "14 on/10 off",
            "12 on/12 off",
            "10 on/14 off",
            "6 on/18 off",
            "24 off"
        ],
        light_on_start_hour: 10,
        target_temperature: 75,
        temperature_min: 60,
        temperature_max: 90,
        humidity_min: 0,
        humidity_max: 90,
        target_humidity: 70,
        humidity_target_range_low: 75,
        humidity_target_range_high: 85,
        current_light_type: "Grow Light Veg",
        light_type_options: [
            "Germinate",
            "Grow Light Veg",
            "Grow Light Bloom"
        ]
    },

    attached_devices: [
        {
            container_name: "sense-python",
            deviceid: 70000007,
            device_type: "bme280",
            protocol: "i2c",
            address: "0x76",
            included_sensors: [{sensor_name: "humidity_sensor"}
                , {sensor_name: "internal_pressure_sensor", address: "44"}, {
                    sensor_name: "thermometer_middle",
                    address: "55"
                }]
        },
        {
            container_name: "sense-python",
            deviceid: 70000008,
            device_type: "bme280",
            protocol: "i2c",
            address: "0x76",
            included_sensors: [{sensor_name: "external_humidity_sensor", address: "55"},
                {sensor_name: "external_pressure_sensor", address: "55"}, {
                    sensor_name: "thermometer_external",
                    address: "55"
                }]
        },
        {
            container_name: "sense-python",
            deviceid: 70000007,
            device_type: "bh1750",
            protocol: "i2c",
            address: "0x23",
            included_sensors: [{sensor_name: "light_sensor", address: "55"}]
        },
        {
            container_name: "sense-go",
            deviceid: 70000008,
            device_type: "ads1115",
            protocol: "i2c",
            address: "0x49",
            included_sensors: [{sensor_name: "water_level", address: "55"}]
        },
        {
            container_name: "sense-go",
            deviceid: 70000008,
            device_type: "ads1115",
            protocol: "i2c",
            address: "0x48",
            included_sensors: [{sensor_name: "", address: "55"}]
        },
        {
            container_name: "sense-go",
            deviceid: 70000008,
            device_type: "adxl345",
            protocol: "i2c",
            address: "0x53",
            included_sensors: [{sensor_name: "movement_sensor", address: "55"}]
        },
        {
            container_name: "sense-go",
            deviceid: 70000008,
            device_type: "ezoph",
            protocol: "i2c",
            address: "0x63",
            included_sensors: [{sensor_name: "root_ph_sensor", address: "55"}]
        },
        {
            container_name: "sense-go",
            deviceid: 70000008,
            device_type: "hcsr04",
            protocol: "i2c",
            address: "0x47",
            included_sensors: [{sensor_name: "distance_sensor", address: "55"}]
        },
        {
            container_name: "sense-go",
            deviceid: 70000008,
            device_type: "GPIO",
            protocol: "gpio",
            address: "0x47",
            included_sensors: [{sensor_name: "cabinet_door_sensor", address: "55"}]
        },
        {
            container_name: "sense-go",
            deviceid: 70000008,
            device_type: "GPIO",
            protocol: "gpio",
            address: "0x47",
            included_sensors: [{sensor_name: "external_door_sensor", address: "55"}]
        }
    ],
    cabinet_settings: {
        humidifier: true,
        humidity_sensor: true,
        external_humidity_sensor: true,
        heater: true,
        thermometer_top: true,
        thermometer_middle: true,
        thermometer_bottom: true,
        external_thermometer: true,
        thermometer_water: true,
        water_pump: true,
        air_pump: true,
        light_sensor: true,
        cabinet_door_sensor: true,
        outer_door_sensor: true,
        movement_sensor: true,
        pressure_sensors: true,
        root_ph_sensor: true,
        enclosure_type: "Cabinet",
        water_level_sensor: true,
        tub_depth: 18.0,
        tub_volume: 20.0,
        intake_fan: true,
        exhaust_fan: true,
        enclosure_options: [
            "Cabinet",
            "Tent"
        ],
        light_bloom: true,
        light_vegetative: true,
        light_germinate: true
    },
    switch_state: {
        automaticControl: {
            on: false
        },
        humidifier: {
            on: true
        },
        heater: {
            on: true
        },
        airPump: {
            on: true
        },
        waterPump: {
            on: true
        },
        intakeFan: {
            on: true
        },
        exhaustFan: {
            on: true
        },
        currentGrowLight: {
            on: true
        }
    }


}

router.get("/:userid/:deviceid", function (req, res, next) {
    console.log("post measurement user: " + req.params.userid + " device: " + req.params.deviceid);
        // read config from file


        res.json(config);
});

module.exports = router;
