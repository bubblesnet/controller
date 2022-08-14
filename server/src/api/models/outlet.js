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


let defaultDevices = [
    { "deviceid": 0, stationid: 0, "name":  "humidifier",         "index": 7, "bcm_pin_number": 26, "on": false },
    { "deviceid": 0,stationid: 0, "name":  "heater",          "index": 4, "bcm_pin_number":  6, "on": false },
    { "deviceid": 0, stationid: 0, "name":  "intakeFan",          "index": 0, "bcm_pin_number": 17, "on": false },
    { "deviceid": 0,stationid: 0, "name":  "exhaustFan",         "index": 6, "bcm_pin_number": 19, "on": false },
    { "deviceid": 0,stationid: 0, "name":  "airPump",           "index": 5, "bcm_pin_number": 13, "on": false },
    { "deviceid": 0,stationid: 0, "name":  "waterPump",         "index": 1, "bcm_pin_number": 27, "on": false },
    { "deviceid": 0,stationid: 0, "name":  "lightBloom", "index": 2, "bcm_pin_number": 22, "on": false },
    { "deviceid": 0,stationid: 0, "name":  "lightVegetative",   "index": 3, "bcm_pin_number":  5, "on": false },
    { "deviceid": 0,stationid: 0, "name":  "waterHeater",   "index": 3, "bcm_pin_number":  5, "on": false },
    { "deviceid": 0,stationid: 0, "name":  "heatingPad",   "index": 0, "bcm_pin_number":  5, "on": false },
    { "deviceid": 0,stationid: 0, "name":  "heatLamp",   "index": 1, "bcm_pin_number":  5, "on": false }
];

async function createDefaultSetOfOutlets( body ) {
    log.info("outlet.createDefaultSetOfOutlets " + JSON.stringify(body))
    let list = []
    for( let i = 0; i < defaultDevices.length; i++ ) {
        defaultDevices[i].deviceid = body.deviceid
        defaultDevices[i].stationid = body.stationid
        log.info(JSON.stringify(defaultDevices[i]))

        let x = await createOutlet(defaultDevices[i])
        list.push(x)
    }
    return(list)
}

/*

 */
async function createOutlet(body) {
    log.info("outlet.createOutlet " + JSON.stringify(body))
    return new Promise(function(resolve, reject) {
        pool.query("insert into outlet (stationid_Station, deviceid_device, name, index, bcm_pin_number, onoff) values ($1,$2,$3,$4,$5,$6)" +
            " RETURNING *",
            [body.stationid, body.deviceid, body.name, body.index, body.bcm_pin_number, body.onoff], (error, results) => {
                if (error) {
                    log.info("createOutlet error " + error)
                    reject(error)
                } else {
                    log.info("new outlet " + JSON.stringify(results.rows[0]))
                    resolve({outletid: results.rows[0].outletid, message: "A new outletid has been added :" + results.rows[0].outletid})
                }
            })
    })
}
async function updateOutlet(body) {
    log.info("outlet.updateOutlet " + JSON.stringify(body))
    return new Promise(function(resolve, reject) {
        pool.query("UPDATE outlet set stationid_station=$2, deviceid_Device=$3, " +
            " name=$4,index=$5,bcm_pin_number=$6, onoff=$7 " +
            " where outletid=$1 ",
            [body.outletid, body.stationid, body.deviceid, body.name, body.index, body.bcm_pin_number, body.onoff], (error, results) => {
                if (error) {
                    log.error("updateOutlet err " + error)
                    reject(error)
                } else {
                    log.info("updateOutlet updated " + results.rowCount + " rows of outlet " + body.outletid)
                    resolve({
                        outletid: body.outletid,
                        rowcount: results.rowCount,
                        message: "outlet has been modified :" + results.rowCount
                    })
                }
            })
    });
}

async function deleteOutlet(outletid) {
    log.info("outlet.deleteOutlet "+outletid)
    return new Promise(function(resolve, reject) {
        log.info("DELETE FROM outlet WHERE outletid "+outletid)

        pool.query('DELETE FROM outlet WHERE outletid = $1', [outletid], (error, results) => {
            if (error) {
                log.error("updateOutlet delete outletid err3 " + error)
                reject(error)
            } else {
//                log.info("results " + JSON.stringify(results))
                resolve({outletid: outletid, rowcount: results.rowCount, message: 'outletid deleted with ID ' + outletid})
            }
        })
    })
}

async function getOutletsByCabinetDevice(stationid, deviceid) {
    log.info("outlet.getOutletsByCabinetDevice "+stationid+"/"+deviceid)
    return new Promise(function (resolve, reject) {
        let ssql = "select onoff as on, deviceid_device as deviceid, * from outlet where stationid_Station=$1 AND deviceid_device=$2"
        pool.query(ssql, [stationid,deviceid], (error, results) => {
            if (error) {
                log.info("getOutletsByCabinetDevice error " + error)
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

async function setStateByNameAndStation( name, stationid, onoff) {
    log.info("outlet.setStateByNameAndStation "+name+"/"+stationid+"/"+onoff)
    return new Promise(function (resolve, reject) {
        let ssql = "update outlet set onoff=$1 where name = $2 and stationid_station = $3 RETURNING *"
        pool.query(ssql, [onoff,name,stationid], (error, results) => {
            if (error) {
                log.info("setStateByNameAndStation error " + error)
                reject(error)
            }
            if (results) {
                resolve(results);
            } else {
                resolve({results: []});
            }
        })
    })


}

async function setDispenserStateByNameAndStation( dispenser_name, stationid, onoff) {
    log.info("outlet.setDispenserStateByNameAndStation "+dispenser_name+"/"+stationid+"/"+onoff)
    return new Promise(function (resolve, reject) {
        let ssql = "update dispenser set onoff=$1 where dispenser_name = $2 and stationid_station = $3 RETURNING *"
        pool.query(ssql, [onoff,dispenser_name,stationid], (error, results) => {
            if (error) {
                log.error("setDispenserStateByNameAndStation error " + error)
                reject(error)
            }
            if (results) {
                resolve(results);
            } else {
                resolve({results: []});
            }
        })
    })


}


module.exports = {
    createOutlet,
    createDefaultSetOfOutlets,
    deleteOutlet,
    getOutletsByCabinetDevice,
    setDispenserStateByNameAndStation,
    setStateByNameAndStation,
    updateOutlet
}