const locals = require("../../config/locals");
const bcrypt = require('bcryptjs');

const server_db = require('./bubbles_db')
const pool = server_db.getPool()


let defaultDevices = [
    { "deviceid": 0, cabinetid: 0, "name":  "humidifier",         "index": 7, "bcm_pin_number": 26, "on": false },
    { "deviceid": 0,cabinetid: 0, "name":  "heater",          "index": 4, "bcm_pin_number":  6, "on": false },
    { "deviceid": 0, cabinetid: 0, "name":  "intakeFan",          "index": 0, "bcm_pin_number": 17, "on": false },
    { "deviceid": 0,cabinetid: 0, "name":  "exhaustFan",         "index": 6, "bcm_pin_number": 19, "on": false },
    { "deviceid": 0,cabinetid: 0, "name":  "airPump",           "index": 5, "bcm_pin_number": 13, "on": false },
    { "deviceid": 0,cabinetid: 0, "name":  "waterPump",         "index": 1, "bcm_pin_number": 27, "on": false },
    { "deviceid": 0,cabinetid: 0, "name":  "lightBloom", "index": 2, "bcm_pin_number": 22, "on": false },
    { "deviceid": 0,cabinetid: 0, "name":  "lightVegetative",   "index": 3, "bcm_pin_number":  5, "on": false },
    { "deviceid": 0,cabinetid: 0, "name":  "heatingPad",   "index": 0, "bcm_pin_number":  5, "on": false },
    { "deviceid": 0,cabinetid: 0, "name":  "heatLamp",   "index": 1, "bcm_pin_number":  5, "on": false }
];

async function createDefaultSetOfOutlets( body ) {
    let list = []
    for( let i = 0; i < defaultDevices.length; i++ ) {
        defaultDevices[i].deviceid = body.deviceid
        defaultDevices[i].cabinetid = body.cabinetid
        console.log(JSON.stringify(defaultDevices[i]))

        let x = await createOutlet(defaultDevices[i])
        list.push(x)
    }
    return(list)
}

/*

 */
async function createOutlet(body) {
//    console.log(JSON.stringify(body))
    return new Promise(function(resolve, reject) {
        pool.query("insert into outlet (cabinetid_cabinet, deviceid_device, name, index, bcm_pin_number, onoff) values ($1,$2,$3,$4,$5,$6)" +
            " RETURNING *",
            [body.cabinetid, body.deviceid, body.name, body.index, body.bcm_pin_number, body.onoff], (error, results) => {
                if (error) {
                    console.log("createOutlet error " + error)
                    reject(error)
                } else {
                    console.log("new outletid " + results.rows[0])
                    resolve({outletid: results.rows[0].outletid, message: "A new outletid has been added :" + results.rows[0].outletid})
                }
            })
    })
}
async function updateOutlet(body) {
    console.log(JSON.stringify(body))
    return new Promise(function(resolve, reject) {
        pool.query("UPDATE outlet set cabinetid_cabinet=$2, deviceid_Device=$3, " +
            " name=$4,index=$5,bcm_pin_number=$6, onoff=$7 " +
            " where outletid=$1 ",
            [body.outletid, body.cabinetid, body.deviceid, body.name, body.index, body.bcm_pin_number, body.onoff], (error, results) => {
                if (error) {
                    console.log("updateoutlet err " + error)
                    reject(error)
                } else {
                    console.log("updated " + results.rowCount + " rows of outlet " + body.outletid)
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
    console.log("deleteOutlet "+outletid)
    return new Promise(function(resolve, reject) {
        console.log("DELETE FROM outlet WHERE outletid "+outletid)

        pool.query('DELETE FROM outlet WHERE outletid = $1', [outletid], (error, results) => {
            if (error) {
                console.error("delete outletid err3 " + error)
                reject(error)
            } else {
//                console.log("results " + JSON.stringify(results))
                resolve({outletid: outletid, rowcount: results.rowCount, message: 'outletid deleted with ID ' + outletid})
            }
        })
    })
}

async function getOutletsByCabinetDevice(cabinetid, deviceid) {
    console.log("getOutletsByCabinetDevice "+cabinetid+"/"+deviceid)
    return new Promise(function (resolve, reject) {
        let ssql = "select onoff as on, deviceid_device as deviceid, * from outlet where cabinetid_cabinet=$1 AND deviceid_device=$2"
        pool.query(ssql, [cabinetid,deviceid], (error, results) => {
            if (error) {
                console.log("getOutletsByCabinetDevice error " + error)
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
    createOutlet,
    createDefaultSetOfOutlets,
    getOutletsByCabinet: getOutletsByCabinetDevice,
    updateOutlet,
    deleteOutlet
}