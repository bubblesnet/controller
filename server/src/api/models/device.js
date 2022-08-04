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

const locals = require("../../config/locals");
const bcrypt = require('bcryptjs');

const server_db = require('./bubbles_db')
const fs = require("fs");
const pool = server_db.getPool()
const endPool = () => {
    pool.end()
}

async function getAllDevices() {
    console.log("device_model getAllDevices")
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
    console.log("findAllByUserid "+userid)
    return new Promise(function (resolve, reject) {
        console.log("userid = " + userid)
        let ssql = 'select * from device where userid_user = $1 order by deviceid'
        console.log("ssql = "+ssql)
        let values = [userid]
        pool.query(ssql, values, (err, results) => {
//            console.log("callback from findAllByUserid with err " + err + " results " + results)
            if (err) {
                console.error("findAllByUserid error " + err)
                reject(err)
            }
            else  {
                resolve(results);
            }
        })
    })
}

async function getDeviceShallow(deviceid) {
    console.log("getDeviceShallow "+deviceid)
    return new Promise(function (resolve, reject) {
        console.log("userid = " + userid)
        let ssql = 'select * from device where deviceid = $1'
        console.log("ssql = "+ssql)
        let values = [deviceid]
        pool.query(ssql, values, (err, results) => {
//            console.log("callback from findAllByUserid with err " + err + " results " + results)
            if (err) {
                console.error("findAllByUserid error " + err)
                reject(err)
            }
            else  {
                resolve(results);
            }
        })
    })
}

async function getDevicesByStationId(userid) {
    return( findAllByStationid(userid))
}


async function findAllByStationid(stationid) {
    console.log("findAllByStationid "+stationid)
    return new Promise(function (resolve, reject) {
        console.log("userid = " + stationid)
        let ssql = 'select * from device where stationid_station = $1 order by deviceid'
        console.log("ssql = "+ssql)
        let values = [stationid]
        pool.query(ssql, values, (err, results) => {
//            console.log("callback from findAllByStationid with err " + err + " results " + results)
            if (err) {
                console.error("findAllByStationid error " + err)
                reject(err)
            }
            else  {
                resolve(results.rows);
            }
        })
    })
}

/*
    deviceid                serial primary key,
    created                 timestamp NOT NULL,
    lastseen                timestamp DEFAULT NULL,
    devicename    varchar(255),
    userid_User             int       NOT NULL,
    devicetypeid_DeviceType int       NOT NULL,
    FOREIGN KEY (userid_User) REFERENCES "user" (userid),
    FOREIGN KEY (devicetypeid_DeviceType) REFERENCES devicetype (devicetypeid)

 */
async function createDevice(body) {
    return new Promise(function(resolve, reject) {
        pool.query("INSERT INTO device (devicename, devicetypeid_Devicetype, userid_User,created, stationid_Station) VALUES ($1,$2,$3,current_timestamp,$4) RETURNING *",
            [body.devicename, body.devicetypeid, body.userid, body.stationid], (error, results) => {
            if (error) {
                reject(error)
            } else {
//                console.log("new deviceid " + results.rows[0])
                resolve({deviceid: results.rows[0].deviceid, message: "A new device has been added :" + results.rows[0].deviceid})
            }
        })
    })
}

async function createDefaultDevices(body) {
    return new Promise(function(resolve, reject) {
        let retval = []
        pool.query("INSERT INTO device (deviceid, devicename, devicetypeid_Devicetype, userid_User,created, stationid_Station) VALUES ( $1,$2,$3,$4,current_timestamp,$5) RETURNING *",
            [70000008, 'Cabinet internal', 0, body.userid, body.stationid], (error, results) => {
                if (error) {
                    console.error(error)
                    reject(error)
                } else {
                    console.log("new deviceid " + results.rows[0])
                    retval[0] = {deviceid: results.rows[0].deviceid, message: "A new device has been added :" + results.rows[0].deviceid}
                }
            })
    })
}


async function updateDevice(body) {
    return new Promise(function(resolve, reject) {
        pool.query("UPDATE device set devicename=$1,devicetypeid_devicetype=$2 where deviceid=$3 RETURNING *",
            [body.devicename, body.devicetypeid, body.deviceid], (error, results) => {
                if (error) {
                    reject(error)
                } else {
//                    console.log("updated updateDevice " + body.deviceid)
                    resolve({deviceid: body.deviceid, rowcount: results.rowCount, message: "device has been modified :" + results.rowCount})
                }
            })
    })
}

async function setLatestPicture( deviceid, filename, datetimemillis )  {
//    let shallowDevice = await device.getDeviceShallow(req.params.deviceid)
//    let rmPath = __dirname + '/../../public/'+shallowDevice.latest_picture_filename

    return new Promise(function(resolve, reject) {

        pool.query("UPDATE device set latest_picture_filename=$1,latest_picture_datetimemillis=$2 where deviceid=$3 RETURNING *",
            [filename, datetimemillis, deviceid], (error, results) => {
                if (error) {
                    reject(error)
                } else {
/*                    console.log("updated updateDevice " + body.deviceid)
                    fs.unlink(rmPath, (err) => {
                        if (err) {
                            console.error(rmPath + ' was NOT deleted - ', err);
                        } else {
                            console.log(rmPath + ' was deleted');
                        }
                    });
*/
                    resolve({deviceid: deviceid, rowcount: results.rowCount, message: "picture has been modified :" + results.rowCount})
                }
            })
    })
}

async function deleteDevice(deviceid) {
    console.log("deleteDevice "+deviceid)
    return new Promise(function(resolve, reject) {
        console.log("DELETE FROM device WHERE deviceid = "+deviceid)

        pool.query('DELETE FROM device WHERE deviceid = $1', [deviceid], (error, results) => {
            console.log("after delete")
            if (error) {
                console.error("deviceid err3 " + error)
                reject(error)
            } else {
//                console.log("results " + JSON.stringify(results))
                resolve({deviceid: deviceid, rowcount: results.rowCount, message: 'device deleted with ID ' + deviceid})
            }
        })
    })
}

module.exports = {
    getAllDevices: getAllDevices,
    createDevice: createDevice,
    findAllByUserid: findAllByUserid,
    deleteDevice: deleteDevice,
    updateDevice:updateDevice,
    endPool: endPool,
    getDevicesByUserId,
    getDevicesByStationId,
    createDefaultDevices,
    setLatestPicture,
    getDeviceShallow,
}

