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

const stage = require('./stage')
const modul = require('./module')
const outlet = require('./outlet')

const server_db = require('./bubbles_db')
const pool = server_db.getPool()
const util = require('../../util')
const endPool = () => {
    pool.end()
}

async function getAllDevices() {
    log.info("device_model getAllDevices")
    return new Promise(function (resolve, reject) {
        let ssql = "select * from device order by userid_user asc"
        pool.query(ssql, (error, results) => {
            if (error) {
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

async function getDevicesByUserId(userid) {
    return( findAllByUserid(userid))
}

async function findAllByUserid(userid) {
    log.info("findAllByUserid "+userid)
    return new Promise(function (resolve, reject) {
        log.info("userid = " + userid)
        let ssql = 'select * from device where userid_user = $1 order by deviceid'
        log.info("ssql = "+ssql)
        let values = [userid]
        pool.query(ssql, values, (err, results) => {
//            log.info("callback from findAllByUserid with err " + err + " results " + results)
            if (err) {
                log.error("findAllByUserid error " + err)
                reject(err)
            }
            else  {
                resolve(results);
            }
        })
    })
}

async function findCabinetIDByDeviceID(userid,deviceid) {
    return new Promise(function (resolve, reject) {
        log.info("deviceid = " + deviceid)
//        let ssql = 'select distinct c.stationid from public.user u left outer join device d on u.userid = d.userid_user left outer join station c on u.userid = c.userid_user where d.deviceid=$1 and u.userid=$2'
        let ssql = 'select stationid from public.user u left outer join device d on u.userid = d.userid_user left outer join station c on c.stationid = d.stationid_station where d.deviceid=$1 and u.userid=$2'
        log.info("ssql = " + ssql)
        pool.query(ssql, [deviceid,userid], async (err, results) => {
            if (err) {
                log.error("getConfigByStation error " + err)
                reject(err)
            } else {
                if(results.rowCount == 0 ) {
                    reject( new Error("no station for deviceid " + deviceid))
                } else {
                    let stationid = results.rows[0].stationid
                    log.info("found stationid " + stationid)
                    resolve(stationid)
                }
            }
        })
    })
}

async function getConfigByDevice(userid,deviceid) {
    let stationid
    try {
        stationid = await findCabinetIDByDeviceID(userid,deviceid)
    } catch(err) {
        log.info("Caught rejection " + err)
        throw (err);
    }
    return (getConfigByStation(stationid, deviceid))
}



async function getConfigByStation(stationid, deviceid) {
    log.info("getConfigByStation " + stationid + ","+deviceid)
    return new Promise(function (resolve, reject) {
        log.info("stationid = " + stationid)
        let ssql = 'select * from station c left outer join device d on d.stationid_station = c.stationid where stationid=$1 order by stationid'
        log.info("ssql = " + ssql)
        pool.query(ssql, [stationid], async (err, results) => {
//            log.info("callback from getConfigByStation with err " + err + " results " + results)
            if (err) {
                log.error("getConfigByStation error " + err)
                reject(err)
            } else {
                if(results.rowCount === 0 ) {
                    reject( new Error("no config for station " + stationid))
                } else {
                    let ret = JSON.parse(JSON.stringify(results.rows[0]));
                    ret.stationid = Number(stationid)
                    ret.deviceid = Number(deviceid)
                    ret.userid = ret.userid_user
                    delete ret.userid_user

                    ret.camera = { picamera: ret.picamera, resolutionX: ret.resolutionX, resolutionY: ret.resolutionY}
                    delete ret.resolutionX
                    delete ret.resolutionY
                    delete ret.picamera

                    ret.tamper = {xmove: ret.tamper_xmove, ymove: ret.tamper_ymove, zmove: ret.tamper_zmove}
                    delete ret.tamper_xmove
                    delete ret.tamper_ymove
                    delete ret.tamper_zmove
                    let device_settings = JSON.parse(JSON.stringify(ret))
                    ret.ac_outlets = await outlet.getOutletsByCabinetDevice(stationid, deviceid)
                    ret.edge_devices = await modul.getAllModulesByCabinet(stationid)

                    ret.device_settings = JSON.parse(JSON.stringify(device_settings))
                    ret.device_settings.enclosure_options = ["CABINET", "TENT", "OUTDOOR"]
                    delete ret.device_settings.deviceid
                    delete ret.device_settings.automatic_control
                    delete ret.device_settings.deviceid
                    delete ret.device_settings.stationid
                    delete ret.device_settings.userid
                    delete ret.device_settings.time_between_pictures_in_seconds
                    delete ret.device_settings.time_between_sensor_polling_in_seconds
                    delete ret.humidifier
                    delete ret.humidity_sensor_internal
                    delete ret.humidity_sensor_external
                    delete ret.heater
                    delete ret.thermometer_top
                    delete ret.thermometer_middle
                    delete ret.thermometer_bottom
                    delete ret.thermometer_external
                    delete ret.thermometer_water
                    delete ret.water_pump
                    delete ret.air_pump
                    delete ret.light_sensor_internal
                    delete ret.light_sensor_external
                    delete ret.station_door_sensor
                    delete ret.outer_door_sensor
                    delete ret.movement_sensor
                    delete ret.pressure_sensors
                    delete ret.root_ph_sensor
                    delete ret.enclosure_type
                    delete ret.water_level_sensor
                    delete ret.intake_fan
                    delete ret.exhaust_fan
                    delete ret.heat_lamp
                    delete ret.heating_pad
                    delete ret.light_bloom
                    delete ret.light_vegetative
                    delete ret.light_germinate

                    ret.stage_schedules = await stage.getStageSchedules(stationid)
                    resolve(ret);
                }
        }})
    })
}


async function createStation(body) {
    const servers = util.get_server_ports_for_environment( process.env.NODE_ENV )
    return new Promise(function(resolve, reject) {
        pool.query("insert into station (" +
            "    tamper_xmove," +
            "    tamper_ymove," +
            "    tamper_zmove," +
            "    humidifier," +
            "    humidity_sensor_internal," +
            "    humidity_sensor_external," +
            "    heater," +
            "    thermometer_top," +
            "    thermometer_middle," +
            "    thermometer_bottom," +
            "    thermometer_external," +
            "    thermometer_water," +
            "    water_pump," +
            "    air_pump," +
            "    light_sensor_internal," +
            "    light_sensor_external," +
            "    station_door_sensor," +
            "    outer_door_sensor," +
            "    movement_sensor," +
            "    pressure_sensors," +
            "    root_ph_sensor," +
            "    enclosure_type," +
            "    water_level_sensor," +
            "    tub_depth," +
            "    tub_volume," +
            "    intake_fan," +
            "    exhaust_fan," +
            "    heat_lamp," +
            "    heating_pad," +
            "    light_bloom," +
            "    light_vegetative," +
            "    light_germinate," +
            "    water_heater," +
            "    station_name)" +
            "values(" +
            "    1.0," +
            "    1.0," +
            "    1.0," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    'CABINET'," +
            "    false," +
            "    0.0," +
            "    0.0," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    false," +
            "    'blah'" +
            ") RETURNING *",
            [], (error, results) => {
            if (error) {
                reject(error)
            } else {
                log.info("new stationid " + results.rows[0])
                resolve({stationid: results.rows[0].stationid, message: "A new station has been added :" + results.rows[0].stationid})
            }
        })
    })
}


async function updateStation(body) {
    return new Promise(function (resolve, reject) {
        pool.query("UPDATE station set " +
            "tamper_xmove=$2, " +
            "tamper_ymove=$3, " +
            "tamper_zmove=$4, " +
            "time_between_pictures_in_seconds=$5, " +
            "time_between_sensor_polling_in_seconds=$6, " +
            "humidifier=$7, " +
            "humidity_sensor_internal=$8, " +
            "humidity_sensor_external=$9, " +
            "heater=$10, " +
            "thermometer_top=$11, " +
            "thermometer_middle=$12, " +
            "thermometer_bottom=$13, " +
            "thermometer_external=$14, " +
            "thermometer_water=$15, " +
            "water_pump=$16, " +
            "air_pump=$17, " +
            "light_sensor_internal=$18, " +
            "light_sensor_internal=$19, " +
            "station_door_sensor=$20, " +
            "outer_door_sensor=$21, " +
            "movement_sensor=$22, " +
            "pressure_sensors=$23, " +
            "root_ph_sensor=$24, " +
            "enclosure_type=$25, " +
            "water_level_sensor=$26, " +
            "tub_depth=$27, " +
            "tub_volume=$28, " +
            "intake_fan=$29, " +
            "exhaust_fan=$30, " +
            "heat_lamp=$31, " +
            "heating_pad=$32, " +
            "light_bloom=$33, " +
            "light_vegetative=$34, " +
            "light_germinate=$35," +
            "voc_sensor=$36," +
            "co2_sensor=$37 " +
            "where stationid=$1 RETURNING *",
            [
                body.stationid,
                body.tamper_xmove,
                body.tamper_ymove,
                body.tamper_zmove,
                body.time_between_pictures_in_seconds,
                body.time_between_sensor_polling_in_seconds,
                body.humidifier,
                body.humidity_sensor_internal,
                body.humidity_sensor_external,
                body.heater,
                body.thermometer_top,
                body.thermometer_middle,
                body.thermometer_bottom,
                body.thermometer_external,
                body.thermometer_water,
                body.water_pump,
                body.air_pump,
                body.light_sensor_internal,
                body.light_sensor_external,
                body.station_door_sensor,
                body.outer_door_sensor,
                body.movement_sensor,
                body.pressure_sensors,
                body.root_ph_sensor,
                body.enclosure_type,
                body.water_level_sensor,
                body.tub_depth,
                body.tub_volume,
                body.intake_fan,
                body.exhaust_fan,
                body.heat_lamp,
                body.heating_pad,
                body.light_bloom,
                body.light_vegetative,
                body.light_germinate,
                body.voc_sensor,
                body.co2_sensor
            ], (error, results) => {
                if (error) {
                    log.info("update err " + error)
                    reject(error)
                } else {
                    log.info("updated " + results.rowCount + " rows of Station " + body.stationid)
                    resolve({
                        stationid: body.stationid,
                        rowcount: results.rowCount,
                        message: "station has been modified :" + results.rowCount
                    })
                }
            })
    })
}


async function deleteStation(stationid) {
    log.info("deleteStation "+stationid)
    return new Promise(function(resolve, reject) {
        log.info("DELETE FROM station WHERE stationid = "+stationid)

        pool.query('DELETE FROM station WHERE stationid = $1', [stationid], (error, results) => {
            if (error) {
                log.error("delete stationid err3 " + error)
                reject(error)
            } else {
//                log.info("results " + JSON.stringify(results))
                resolve({stationid: stationid, rowcount: results.rowCount, message: 'station deleted with ID ' + stationid})
            }
        })
    })
}

async function setSensorPresent(stationid,sensor_name,present) {
    log.info("setSensorPresent " + sensor_name + " present " + present + " where stationid=" + stationid)
    return new Promise(function (resolve, reject) {
        log.info("UPDATE station set " + sensor_name + " = " + present + " where stationid=" + stationid)
        if (present === null) {
            reject(new Error("Sensorpresent value for " + sensor_name + " (" + present + ") is null"))
        }
        let present_boolean = true
        if (present.toUpperCase() === "TRUE") {
            present_boolean = true
        } else if (present.toUpperCase() === "FALSE") {
            present_boolean = false
        } else {
            reject(new Error("Sensorpresent value for " + sensor_name + " (" + present + ") is not boolean"))
        }

        let ssql = 'UPDATE station set ' + sensor_name + '=$2 where stationid = $1 RETURNING *'
        pool.query(ssql, [stationid, present_boolean], (error, results) => {
            if (error) {
                log.error("update stationid err3 " + error)
                reject(error)
            } else {
//                log.info("setSensorPresent results " + JSON.stringify(results))
                resolve({
                    stationid: stationid,
                    rowcount: results.rowCount,
                    message: 'station updated ' + results.rowCount
                })
            }
        })
    })
}



module.exports = {
//    getAllCabinets,
    createStation: createStation,
//    findAllByUserid,
    setSensorPresent,
    deleteStation: deleteStation,
    updateStation: updateStation,
    getConfigByStation: getConfigByStation,
    getConfigByDevice,
    endPool,
}

