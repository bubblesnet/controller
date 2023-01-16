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
const sensor = require('./sensor')
const server_db = require('./bubbles_db')
const pool = server_db.getPool()


/*

 */
async function createModule(body) {
//    log.info(JSON.stringify(body))
    return new Promise(function(resolve, reject) {
        pool.query("insert into module (module_name, deviceid_device, container_name, module_type, i2caddress, protocol) values ($1,$2,$3,$4,$5, $6)" +
            " RETURNING *",
            [body.module_name, body.deviceid, body.container_name, body.module_type, body.i2caddress, body.protocol], (error, results) => {
                if (error) {
                    log.info("createModule error " + error)
                    reject(error)
                } else {
                    log.info("new moduleid " + results.rows[0])
                    resolve({moduleid: results.rows[0].moduleid, message: "A new moduleid has been added :" + results.rows[0].moduleid})
                }
            })
    })
}
async function updateModule(body) {
    log.info(JSON.stringify(body))
    return new Promise(function(resolve, reject) {
        pool.query("UPDATE module set deviceid_Device=$2, " +
            " module_name=$3,container_name=$4,module_type=$5, i2caddress=$6 " +
            " where moduleid=$1 ",
            [body.moduleid, body.deviceid, body.module_name, body.container_name, body.module_type, body.i2caddress], (error, results) => {
                if (error) {
                    log.info("updatemodule err " + error)
                    reject(error)
                } else {
                    log.info("updated " + results.rowCount + " rows of module " + body.moduleid)
                    resolve({
                        moduleid: body.moduleid,
                        rowcount: results.rowCount,
                        message: "module has been modified :" + results.rowCount
                    })
                }
            })
    });
}

async function deleteModule(moduleid) {
    log.info("deleteModule "+moduleid)
    return new Promise(function(resolve, reject) {
        log.info("DELETE FROM module WHERE moduleid = "+moduleid)

        pool.query('DELETE FROM module WHERE moduleid = $1', [moduleid], (error, results) => {
            if (error) {
                log.error("delete moduleid err3 " + error)
                reject(error)
            } else {
//                log.info("results " + JSON.stringify(results))
                resolve({moduleid: moduleid, rowcount: results.rowCount, message: 'moduleid deleted with ID ' + moduleid})
            }
        })
    })
}

let defaultModules = [
    {
        "container_name": "sense-python",
        "deviceid": 0,
        "module_name": "Temp/Humidity/Pressure sensor",
        "module_type": "bme280",
        "protocol": "i2c",
        "i2caddress": "0x76",
    },
    {
        "container_name": "sense-python",
        "deviceid": 0,
        "module_type": "bme280",
        "module_name": "Temp/Humidity/Pressure sensor",
        "protocol": "i2c",
        "i2caddress": "0x76",
    },
    {
        "container_name": "sense-python",
        "deviceid": 0,
        "module_type": "bh1750",
        "module_name": "Accelerometer/Tilt-detector",
        "protocol": "i2c",
        "i2caddress": "0x23",
    },
    {
        "container_name": "sense-go",
        "deviceid": 0,
        "module_type": "ads1115",
        "module_name": "AtoD Converter",
        "protocol": "i2c",
        "i2caddress": "0x49",
    },
    {
        "container_name": "sense-go",
        "deviceid": 0,
        "module_type": "ads1115",
        "module_name": "AtoD Converter",
        "protocol": "i2c",
        "i2caddress": "0x48",
    },
    {
        "container_name": "sense-go",
        "deviceid": 0,
        "module_type": "adxl345",
        "module_name": "Light sensor",
        "protocol": "i2c",
        "i2caddress": "0x53"
    },
    {
        "container_name": "sense-go",
        "deviceid": 0,
        "module_type": "ezoph",
        "module_name": "pH Sensor",
        "protocol": "i2c",
        "i2caddress": "0x63"
    },
    {
        "container_name": "sense-go",
        "deviceid": 0,
        "module_type": "hcsr04",
        "module_name": "Ultrasonic Distance Sensor",
        "protocol": "i2c",
        "i2caddress": "0x47"
    },
    {
        "container_name": "sense-go",
        "deviceid": 0,
        "module_type": "GPIO",
        "module_name": "GPIO",
        "protocol": "gpio",
        "i2caddress": "0x47"
    },
    {
        "container_name": "sense-go",
        "deviceid": 0,
        "module_type": "GPIO",
        "module_name": "GPIO",
        "protocol": "gpio",
        "i2caddress": "0x47"
    }
]

async function createDefaultModules(deviceid) {
    let list = []
    for (let i = 0; i < defaultModules.length; i++) {
        defaultModules[i].deviceid = deviceid
//        log.info(JSON.stringify(defaultModules[i]))

        let x = await createModule(defaultModules[i])
        list.push(x)
    }
    log.info("returning list length " + list.length)
    return (list)
}

async function createDefaultSetOfModules( body ) {
    let list = await createDefaultModules(body.deviceid)
    return (list);
}

async function getAllModulesByCabinet(stationid) {
    log.info("getAllModulesByCabinet " + stationid)
    return new Promise( function (resolve, reject) {
        let ssql = "select lastseen, d.lastseen_millis, i2caddress, container_name, devicetypename, module_type, deviceid, moduleid, protocol from station c join device d on d.stationid_Station = stationid join devicetype t on d.devicetypeid_devicetype=t.devicetypeid join module m on m.deviceid_device = d.deviceid where c.stationid =$1"
        pool.query(ssql, [stationid], async (error, results) => {
            if (error) {
                log.info("getAllModulesByCabinet error " + error)
                reject(error)
            }
            if (results) {
                for(let i = 0; i < results.rowCount; i++ ) {
                    let included_sensors = await sensor.getAllSensorsByModule(results.rows[i].moduleid)
                    results.rows[i].included_sensors = included_sensors
                }
                resolve(results.rows);
            } else {
                resolve({results: []});
            }
        })
    })
}

module.exports = {
    createModule,
    createDefaultSetOfModules,
    getAllModulesByCabinet,
    updateModule,
    deleteModule
}