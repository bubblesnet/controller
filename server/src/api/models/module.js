const locals = require("../../config/locals");
const bcrypt = require('bcryptjs');
const sensor = require('./sensor')
const server_db = require('./bubbles_db')
const pool = server_db.getPool()


/*

 */
async function createModule(body) {
//    console.log(JSON.stringify(body))
    return new Promise(function(resolve, reject) {
        pool.query("insert into module (modulename, deviceid_device, containername, moduletype, i2caddress, protocol) values ($1,$2,$3,$4,$5, $6)" +
            " RETURNING *",
            [body.modulename, body.deviceid, body.containername, body.moduletype, body.i2caddress, body.protocol], (error, results) => {
                if (error) {
                    console.log("createModule error " + error)
                    reject(error)
                } else {
                    console.log("new moduleid " + results.rows[0])
                    resolve({moduleid: results.rows[0].moduleid, message: "A new moduleid has been added :" + results.rows[0].moduleid})
                }
            })
    })
}
async function updateModule(body) {
    console.log(JSON.stringify(body))
    return new Promise(function(resolve, reject) {
        pool.query("UPDATE module set deviceid_Device=$2, " +
            " modulename=$3,containername=$4,moduletype=$5, i2caddress=$6 " +
            " where moduleid=$1 ",
            [body.moduleid, body.deviceid, body.modulename, body.containername, body.moduletype, body.i2caddress], (error, results) => {
                if (error) {
                    console.log("updatemodule err " + error)
                    reject(error)
                } else {
                    console.log("updated " + results.rowCount + " rows of module " + body.moduleid)
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
    console.log("deleteModule "+moduleid)
    return new Promise(function(resolve, reject) {
        console.log("DELETE FROM module WHERE moduleid "+moduleid)

        pool.query('DELETE FROM module WHERE moduleid = $1', [moduleid], (error, results) => {
            if (error) {
                console.error("delete moduleid err3 " + error)
                reject(error)
            } else {
//                console.log("results " + JSON.stringify(results))
                resolve({moduleid: moduleid, rowcount: results.rowCount, message: 'moduleid deleted with ID ' + moduleid})
            }
        })
    })
}

let defaultModules = [
    {
        "containername": "sense-python",
        "deviceid": 0,
        "modulename": "Temp/Humidity/Pressure sensor",
        "moduletype": "bme280",
        "protocol": "i2c",
        "i2caddress": "0x76",
    },
    {
        "containername": "sense-python",
        "deviceid": 0,
        "moduletype": "bme280",
        "modulename": "Temp/Humidity/Pressure sensor",
        "protocol": "i2c",
        "i2caddress": "0x76",
    },
    {
        "containername": "sense-python",
        "deviceid": 0,
        "moduletype": "bh1750",
        "modulename": "Accelerometer/Title-detector",
        "protocol": "i2c",
        "i2caddress": "0x23",
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "moduletype": "ads1115",
        "modulename": "AtoD Converter",
        "protocol": "i2c",
        "i2caddress": "0x49",
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "moduletype": "ads1115",
        "modulename": "AtoD Converter",
        "protocol": "i2c",
        "i2caddress": "0x48",
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "moduletype": "adxl345",
        "modulename": "Light sensor",
        "protocol": "i2c",
        "i2caddress": "0x53"
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "moduletype": "ezoph",
        "modulename": "pH Sensor",
        "protocol": "i2c",
        "i2caddress": "0x63"
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "moduletype": "hcsr04",
        "modulename": "Ultrasonic Distance Sensor",
        "protocol": "i2c",
        "i2caddress": "0x47"
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "moduletype": "GPIO",
        "modulename": "GPIO",
        "protocol": "gpio",
        "i2caddress": "0x47"
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "moduletype": "GPIO",
        "modulename": "GPIO",
        "protocol": "gpio",
        "i2caddress": "0x47"
    }
]

async function createDefaultSetOfModules( body ) {
    let list = []
    for( let i = 0; i < defaultModules.length; i++ ) {
        defaultModules[i].deviceid = body.deviceid
//        console.log(JSON.stringify(defaultModules[i]))

        let x = await createModule(defaultModules[i])
        list.push(x)
    }
    return(list)
}

async function getAllModulesByCabinet(cabinetid) {
    console.log("getAllModulesByCabinet")
    return new Promise( function (resolve, reject) {
        let ssql = "select i2caddress, containername, devicetypename, moduletype, deviceid, moduleid, protocol from cabinet c join device d on d.cabinetid_cabinet = cabinetid join devicetype t on d.devicetypeid_devicetype=t.devicetypeid join module m on m.deviceid_device = d.deviceid where c.cabinetid =$1"
        pool.query(ssql, [cabinetid], async (error, results) => {
            if (error) {
                console.log("getAllModulesByCabinet error " + error)
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