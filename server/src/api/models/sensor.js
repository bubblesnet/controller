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
const log = require("../../bubbles_logger").log

const locals = require("../../config/locals");
const bcrypt = require('bcryptjs');

const server_db = require('./bubbles_db')
const pool = server_db.getPool()


/*

 */
async function createSensor(body) {
//    log.info(JSON.stringify(body))
    return new Promise(function(resolve, reject) {
        pool.query("insert into sensor (sensor_name, moduleid_module, measurement_name) values ($1,$2,$3)" +
            " RETURNING *",
            [body.sensor_name, body.moduleid, body.measurement_name], (error, results) => {
                if (error) {
                    log.info("createSensor error " + error)
                    reject(error)
                } else {
                    log.info("new sensorid " + results.rows[0])
                    resolve({sensorid: results.rows[0].sensorid, message: "A new sensorid has been added :" + results.rows[0].sensorid})
                }
            })
    })
}
async function updateSensor(body) {
    log.info(JSON.stringify(body))
    return new Promise(function(resolve, reject) {
        pool.query("UPDATE sensor set moduleid_module=$2, sensor_name=$3,measurement_name=$4,extraconfig=$5 where sensorid=$1 ",
            [body.sensorid, body.moduleid, body.sensor_name, body.measurement_name, body.extraconfig], (error, results) => {
                if (error) {
                    log.info("updatesensor err " + error)
                    reject(error)
                } else {
                    log.info("updated " + results.rowCount + " rows of sensor " + body.sensorid)
                    resolve({
                        sensorid: body.sensorid,
                        rowcount: results.rowCount,
                        message: "sensor has been modified :" + results.rowCount
                    })
                }
            })
    });
}

async function deleteSensor(sensorid) {
    log.info("deleteSensor "+sensorid)
    return new Promise(function(resolve, reject) {
        log.info("DELETE FROM sensor WHERE sensorid="+sensorid)

        pool.query('DELETE FROM sensor WHERE sensorid = $1', [sensorid], (error, results) => {
            if (error) {
                log.error("delete sensorid err3 " + error)
                reject(error)
            } else {
//                log.info("results " + JSON.stringify(results))
                resolve({sensorid: sensorid, rowcount: results.rowCount, message: 'sensorid deleted with ID ' + sensorid})
            }
        })
    })
}

let defaultSensors = [
    {
        "containername": "sense-python",
        "deviceid": 0,
        "sensor_name": "Temp/Humidity/Pressure sensor",
        "sensortype": "bme280",
        "protocol": "i2c",
        "i2caddress": "0x76",
    },
    {
        "containername": "sense-python",
        "deviceid": 0,
        "sensortype": "bme280",
        "sensor_name": "Temp/Humidity/Pressure sensor",
        "protocol": "i2c",
        "i2caddress": "0x76",
    },
    {
        "containername": "sense-python",
        "deviceid": 0,
        "sensortype": "bh1750",
        "sensor_name": "Accelerometer/Title-detector",
        "protocol": "i2c",
        "i2caddress": "0x23",
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "sensortype": "ads1115",
        "sensor_name": "AtoD Converter",
        "protocol": "i2c",
        "i2caddress": "0x49",
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "sensortype": "ads1115",
        "sensor_name": "AtoD Converter",
        "protocol": "i2c",
        "i2caddress": "0x48",
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "sensortype": "adxl345",
        "sensor_name": "Light sensor",
        "protocol": "i2c",
        "i2caddress": "0x53"
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "sensortype": "ezoph",
        "sensor_name": "pH Sensor",
        "protocol": "i2c",
        "i2caddress": "0x63"
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "sensortype": "hcsr04",
        "sensor_name": "Ultrasonic Distance Sensor",
        "protocol": "i2c",
        "i2caddress": "0x47"
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "sensortype": "GPIO",
        "sensor_name": "GPIO",
        "protocol": "gpio",
        "i2caddress": "0x47"
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "sensortype": "GPIO",
        "sensor_name": "GPIO",
        "protocol": "gpio",
        "i2caddress": "0x47"
    }
]

async function getAllSensorsByModule(moduleid) {
    log.info("getAllSensorsByCabinet")
    return new Promise(function (resolve, reject) {
        let ssql = "select * from sensor where moduleid_module =$1"
        pool.query(ssql, [moduleid], (error, results) => {
            if (error) {
                log.info("getAllSensorsByModule error " + error)
                reject(error)
            }
            if (results) {
                resolve(results.rows);
            } else {
                resolve({results: []});
            }
        })
    })
}

module.exports = {
    createSensor,
    getAllSensorsByModule,
    updateSensor,
    deleteSensor
}