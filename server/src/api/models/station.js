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

const {sql} = require('@databases/pg');
const stage = require('./stage')
const device = require('./device')
const db = require('./database')
const server_db = require('./bubbles_db')
const pool = server_db.getPool()

async function getConfigBySite(siteid) {
    const results = await db.query(sql`SELECT userid, firstname, lastname, email, username, created, deleted, timezone, provisioned, mobilenumber FROM public.user join site s on s.userid_user = userid where s.siteid = ${siteid}`);
    let result = results[0]
    result.stations = await getStationConfigsBySite(siteid)
    /// TODO: GET the stage schedules and site-level config into the SQL functions - this is a shortcut that guarantees a single global schedule
    for( let i = 0; i < result.stations.length; i++ ) {
        result.stations[i].stage_schedules = stage.getStageSchedules(result.stations[i].stationid)
    }
    log.info("\n\n\n"+JSON.stringify(result))
    return( result )
}

async function getConfigByUser(uid) {
    log.info("getConfigByUser "+uid)
    const results = await db.query(sql`SELECT userid, firstname, lastname, email, username, created, deleted, timezone, provisioned, mobilenumber FROM public.user where userid=${uid}`);
    let result = results[0]
    result.stations = await getStationConfigsByUser(uid)
    log.info("results = " + JSON.stringify(results))
    /// TODO: GET the stage schedules and site-level config into the SQL functions - this is a shortcut that guarantees a single global schedule
    for( let i = 0; i < result.stations.length; i++ ) {

        result.stations[i].tamper = {xmove: result.stations[i].tamper_xmove, ymove: result.stations[i].tamper_ymove, zmove: result.stations[i].tamper_zmove}
        delete result.stations[i].tamper_xmove
        delete result.stations[i].tamper_ymove
        delete result.stations[i].tamper_zmove

        result.stations[i].stage_schedules = stage.getStageSchedules(result.stations[i].stationid)
        result.siteid = 1
        result.stations[i].automation_settings = await getAutomationSettings(result.stations[i].stationid)
        result.stations[i].dispensers = await getDispensersForStation(result.stations[i].stationid)

    }
    log.info("\n\n\n"+JSON.stringify(result))
    return( result )
}

async function getDispensersForStation(stationid) {
    const results = await db.query(
        sql`SELECT * from dispenser d join additive a on d.currently_loaded_additiveid = a.additiveid where stationid_station=${stationid}`
    );
    return( results )
}


async function getAutomationSettings(stationid) {
    const results = await db.query(
        sql`
            SELECT * from automationsettings where stationid_station = ${stationid}
            `)
    log.info("\n\n\n"+JSON.stringify(results[0]))
    return( results[0] )

}

async function getEvents(stationid, count) {
    const results = await db.query(
        sql`
            SELECT * from event where stationid_station = ${stationid}
            `)
    log.info("\n\n\n"+JSON.stringify(results[0]))
    return( results[0] )

}

async function getStationConfigsBySite(siteid) {
    const results = await db.query(
        sql`
            SELECT sitename as site_name, station_name, location, stationid, current_stage, tamper_xmove, tamper_ymove, tamper_zmove,
                   time_between_pictures_in_seconds, time_between_sensor_polling_in_seconds, humidifier, humidity_sensor_internal,
                   humidity_sensor_external, heater, thermometer_top, thermometer_middle, thermometer_bottom, thermometer_external,
                   thermometer_water, water_pump, air_pump, light_sensor_internal, light_sensor_external, station_door_sensor, outer_door_sensor, movement_sensor,
                   pressure_sensors, root_ph_sensor, enclosure_type, water_level_sensor, tub_depth, tub_volume, intake_fan, exhaust_fan,
                   heat_lamp, heating_pad, light_bloom, light_vegetative, light_germinate, height_sensor, automatic_control, voc_sensor, co2_sensor, ec_sensor, 
                                   coalesce(
                                           (
                                               SELECT array_to_json(array_agg(row_to_json(x)))
                                               FROM (
                                                        SELECT c.stationid AS stationid,
                                                               d.deviceid  AS deviceid,
                                                               d.picamera,
                                                               d.picamera_resolutionx,
                                                               d.picamera_resolutiony,
                                                               coalesce((
                                                                            SELECT array_to_json(array_agg(row_to_json(y)))
                                                                            FROM (
                                                                                     SELECT moduleid,
                                                                                            module_name,
                                                                                            container_name,
                                                                                            module_type,
                                                                                            i2caddress as address,
                                                                                            protocol,
                                                                                            coalesce((
                                                                                                         SELECT array_to_json(array_agg(row_to_json(y)))
                                                                                                         FROM (
                                                                                                                  SELECT sensorid, sensor_name, measurement_name, extraconfig
                                                                                                                  from sensor s
                                                                                                                  where s.moduleid_module = n.moduleid
                                                                                                              ) y)
                                                                                                ,
                                                                                                     '[]') as included_sensors
                                                                                     from module n
                                                                                     where n.deviceid_device = d.deviceid
                                                                                 ) y)
                                                                   , '[]') as modules,
                                                               coalesce((
                                                                            SELECT array_to_json(array_agg(row_to_json(o)))
                                                                            FROM (
                                                                                     SELECT outletid,

                                                                                            name,
                                                                                            index,
                                                                                            bcm_pin_number,
                                                                                            onoff
                                                                                     from outlet o
                                                                                     where o.deviceid_device = d.deviceid
                                                                                 ) o)
                                                                   , '[]') as ac_outlets


                                                        FROM station z
                                                                 JOIN device d ON (d.stationid_Station = c.stationid)
                                                        WHERE z.stationid = d.stationid_Station
                                                    ) x
                                           ),
                                           '[]'
                                       ) AS attached_devices
            FROM public.user u
            JOIN site i ON i.userid_user = u.userid
            JOIN station c ON c.siteid_site=i.siteid
            WHERE i.siteid = ${siteid}`
    );
    let site = { siteid: siteid, sitename: "blah", stations: results }
    log.info("\n\n\n"+JSON.stringify(site))
    return( site )
}

async function getStationConfigsByUser(uid) {
    const results = await db.query(
        sql`
            SELECT stationid, tamper_xmove, tamper_ymove, tamper_zmove, current_stage,
                   time_between_pictures_in_seconds, time_between_sensor_polling_in_seconds, humidifier, humidity_sensor_internal,
                   humidity_sensor_external, heater, thermometer_top, thermometer_middle, thermometer_bottom, thermometer_external,
                   thermometer_water, water_pump, air_pump, light_sensor_internal, light_sensor_external,station_door_sensor, outer_door_sensor, movement_sensor,
                   pressure_sensors, root_ph_sensor, enclosure_type, water_level_sensor, tub_depth, tub_volume, intake_fan, exhaust_fan,
                   heat_lamp, heating_pad, light_bloom, light_vegetative, light_germinate, height_sensor, automatic_control, voc_sensor, co2_sensor, ec_sensor, 
                                   coalesce(
                                           (
                                               SELECT array_to_json(array_agg(row_to_json(x)))
                                               FROM (
                                                        SELECT c.stationid AS stationid,
                                                               d.deviceid  AS deviceid,
                                                               d.picamera,
                                                               d.picamera_resolutionx,
                                                               d.picamera_resolutiony,
                                                               coalesce((
                                                                            SELECT array_to_json(array_agg(row_to_json(y)))
                                                                            FROM (
                                                                                     SELECT moduleid,
                                                                                            module_name,
                                                                                            container_name,
                                                                                            module_type,
                                                                                            i2caddress as address,
                                                                                            protocol,
                                                                                            coalesce((
                                                                                                         SELECT array_to_json(array_agg(row_to_json(y)))
                                                                                                         FROM (
                                                                                                                  SELECT sensorid, sensor_name, measurement_name, extraconfig
                                                                                                                  from sensor s
                                                                                                                  where s.moduleid_module = n.moduleid
                                                                                                              ) y)
                                                                                                ,
                                                                                                     '[]') as included_sensors
                                                                                     from module n
                                                                                     where n.deviceid_device = d.deviceid
                                                                                 ) y)
                                                                   , '[]') as modules,
                                                               coalesce((
                                                                            SELECT array_to_json(array_agg(row_to_json(o)))
                                                                            FROM (
                                                                                     SELECT outletid,
                                                                                            
                                                                                            name,
                                                                                            index,
                                                                                            bcm_pin_number,
                                                                                            onoff
                                                                                     from outlet o
                                                                                     where o.deviceid_device = d.deviceid
                                                                                 ) o)
                                                                   , '[]') as ac_outlets


                                                        FROM station z
                                                                 JOIN device d ON (d.stationid_Station = c.stationid)
                                                        WHERE z.stationid = d.stationid_Station
                                                    ) x
                                           ),
                                           '[]'
                                       ) AS edge_devices    
            FROM public.user u
            JOIN site ss ON ss.userid_user=u.userid
            JOIN station c ON c.siteid_site=ss.siteid
            WHERE u.userid=${uid}
  `,
    );
    log.info("\n\n\n"+JSON.stringify(results))
    if( results.length > 0 && typeof results[0].edge_devices !== 'undefined') {
        for (let i = 0; i < results[0].edge_devices.length; i++) {
            results[0].edge_devices[i].camera = {
                picamera: results[0].edge_devices[i].picamera,
                resolutionX: results[0].edge_devices[i].resolutionX,
                resolutionY: results[0].edge_devices[i].resolutionY
            }
            delete results[0].edge_devices[i].resolutionX
            delete results[0].edge_devices[i].resolutionY
            delete results[0].edge_devices[i].picamera
        }
    }
    return( results )
}

async function addStation(name, siteid) {
    //    log.info(JSON.stringify(body))
    return new Promise(async function(resolve, reject) {
        await pool.query("insert into station (station_name, siteid_site) values ($1,$2) RETURNING *",
            [name,siteid], (error, results) => {
                if (error) {
                    log.info("addStation error " + error)
                    reject(error)
                } else {
                    log.info("new station " + JSON.stringify(results.rows[0]))
                    resolve({stationid: results.rows[0].stationid, message: "A new stationid has been added :" + results.rows[0].stationid})
                }
            })
    })
}

async function updateStation(stationid, name) {
    //    log.info(JSON.stringify(body))
    return new Promise(async function(resolve, reject) {
        await pool.query("update station set station_name = $1 where stationid = $2 RETURNING *",
            [name,stationid], (error, results) => {
                if (error) {
                    log.info("updateStation error " + error)
                    reject(error)
                } else {
                    log.info("updateStation " + JSON.stringify(results.rows[0]))
                    resolve({stationid: results.rows[0].stationid, message: "Station has been updated :" + results.rows[0].stationid})
                }
            })
    })
}


async function deleteStation(stationid) {
    return new Promise(async function(resolve, reject) {
        await pool.query("delete from station where stationid = $1 RETURNING *",
            [stationid], (error, results) => {
                if (error) {
                    log.info("deleteStation error " + error)
                    reject(error)
                } else {
                    log.info("deleted station " + results.rows[0])
                    resolve({stationid: results.rows[0].stationid, message: "Station has been deleted :" + results.rows[0].stationid})
                }
            })
    })
}

async function getStationsForSite(siteid) {
    log.info("getStationsForSite")
    return new Promise(async function (resolve, reject) {
        log.info("getSite db query")
        const results = await db.query(sql`SELECT * from station where siteid_site=${siteid}`);
        for( let i = 0; i < results.length; i++) {
            results[i].attached_devices = await device.getDevicesByStationId(results[i].stationid)
        }
        resolve( results )
    })
}

module.exports = {
    addStation,
    updateStation,
    deleteStation,
    getStationsForSite,
    getConfigBySite,
    getStationConfigsBySite,
    getConfigByUser,
    getCabinetConfigsByUser: getStationConfigsByUser
}