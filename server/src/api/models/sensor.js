const locals = require("../../config/locals");
const bcrypt = require('bcryptjs');

const server_db = require('./bubbles_db')
const pool = server_db.getPool()


/*

 */
async function createSensor(body) {
//    console.log(JSON.stringify(body))
    return new Promise(function(resolve, reject) {
        pool.query("insert into sensor (sensorname, moduleid_module, sensorname, measurementname) values ($1,$2,$3,$4)" +
            " RETURNING *",
            [body.sensorname, body.moduleid, body.sensorname, body.measurementname], (error, results) => {
                if (error) {
                    console.log("createSensor error " + error)
                    reject(error)
                } else {
                    console.log("new sensorid " + results.rows[0])
                    resolve({sensorid: results.rows[0].sensorid, message: "A new sensorid has been added :" + results.rows[0].sensorid})
                }
            })
    })
}
async function updateSensor(body) {
    console.log(JSON.stringify(body))
    return new Promise(function(resolve, reject) {
        pool.query("UPDATE sensor set moduleid_module=$2, sensorname=$3,measurementname=$4,extraconfig=$5 where sensorid=$1 ",
            [body.sensorid, body.moduleid, body.sensorname, body.measurementname, body.extraconfig], (error, results) => {
                if (error) {
                    console.log("updatesensor err " + error)
                    reject(error)
                } else {
                    console.log("updated " + results.rowCount + " rows of sensor " + body.sensorid)
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
    console.log("deleteSensor "+sensorid)
    return new Promise(function(resolve, reject) {
        console.log("DELETE FROM sensor WHERE sensorid "+sensorid)

        pool.query('DELETE FROM sensor WHERE sensorid = $1', [sensorid], (error, results) => {
            if (error) {
                console.error("delete sensorid err3 " + error)
                reject(error)
            } else {
//                console.log("results " + JSON.stringify(results))
                resolve({sensorid: sensorid, rowcount: results.rowCount, message: 'sensorid deleted with ID ' + sensorid})
            }
        })
    })
}

let defaultSensors = [
    {
        "containername": "sense-python",
        "deviceid": 0,
        "sensorname": "Temp/Humidity/Pressure sensor",
        "sensortype": "bme280",
        "protocol": "i2c",
        "i2caddress": "0x76",
    },
    {
        "containername": "sense-python",
        "deviceid": 0,
        "sensortype": "bme280",
        "sensorname": "Temp/Humidity/Pressure sensor",
        "protocol": "i2c",
        "i2caddress": "0x76",
    },
    {
        "containername": "sense-python",
        "deviceid": 0,
        "sensortype": "bh1750",
        "sensorname": "Accelerometer/Title-detector",
        "protocol": "i2c",
        "i2caddress": "0x23",
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "sensortype": "ads1115",
        "sensorname": "AtoD Converter",
        "protocol": "i2c",
        "i2caddress": "0x49",
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "sensortype": "ads1115",
        "sensorname": "AtoD Converter",
        "protocol": "i2c",
        "i2caddress": "0x48",
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "sensortype": "adxl345",
        "sensorname": "Light sensor",
        "protocol": "i2c",
        "i2caddress": "0x53"
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "sensortype": "ezoph",
        "sensorname": "pH Sensor",
        "protocol": "i2c",
        "i2caddress": "0x63"
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "sensortype": "hcsr04",
        "sensorname": "Ultrasonic Distance Sensor",
        "protocol": "i2c",
        "i2caddress": "0x47"
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "sensortype": "GPIO",
        "sensorname": "GPIO",
        "protocol": "gpio",
        "i2caddress": "0x47"
    },
    {
        "containername": "sense-go",
        "deviceid": 0,
        "sensortype": "GPIO",
        "sensorname": "GPIO",
        "protocol": "gpio",
        "i2caddress": "0x47"
    }
]

async function getAllSensorsByModule(moduleid) {
    console.log("getAllSensorsByCabinet")
    return new Promise(function (resolve, reject) {
        let ssql = "select * from sensor where moduleid_module =$1"
        pool.query(ssql, [moduleid], (error, results) => {
            if (error) {
                console.log("getAllSensorsByModule error " + error)
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