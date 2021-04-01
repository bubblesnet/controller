const locals = require("../../config/locals");
const bcrypt = require('bcryptjs');

const stage = require('./stage')
const modul = require('./module')
const outlet = require('./outlet')

const server_db = require('./bubbles_db')
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

async function findCabinetIDByDeviceID(userid,deviceid) {
    return new Promise(function (resolve, reject) {
        console.log("deviceid = " + deviceid)
        let ssql = 'select distinct c.stationid from public.user u left outer join device d on u.userid = d.userid_user left outer join station c on u.userid = c.userid_user where d.deviceid=$1 and u.userid=$2'

        console.log("ssql = " + ssql)
        pool.query(ssql, [deviceid,userid], async (err, results) => {
            if (err) {
                console.error("getConfigByStation error " + err)
                reject(err)
            } else {
                if(results.rowCount == 0 ) {
                    reject( new Error("no station for deviceid " + deviceid))
                } else {
                    let stationid = results.rows[0].stationid
                    console.log("found stationid " + stationid)
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
        console.log("Caught rejection " + err)
        throw (err);
    }
    return (getConfigByStation(stationid, deviceid))
}



async function getConfigByStation(stationid, deviceid) {
    console.log("getConfigByStation " + stationid + ","+deviceid)
    return new Promise(function (resolve, reject) {
        console.log("stationid = " + stationid)
        let ssql = 'select * from station c left outer join device d on d.stationid_station = c.stationid where stationid=$1 order by stationid'
        console.log("ssql = " + ssql)
        pool.query(ssql, [stationid], async (err, results) => {
//            console.log("callback from getConfigByStation with err " + err + " results " + results)
            if (err) {
                console.error("getConfigByStation error " + err)
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
                let tamper = {xmove: ret.tamper_xmove, ymove: ret.tamper_ymove, zmove: ret.tamper_zmove}
                delete ret.tamper_xmove
                delete ret.tamper_ymove
                delete ret.tamper_zmove
                let device_settings = JSON.parse(JSON.stringify(ret))
                ret.tamper = tamper
                ret.ac_outlets = await outlet.getOutletsByCabinetDevice(stationid,deviceid)
                ret.edge_devices = await modul.getAllModulesByCabinet(stationid)

                ret.device_settings = JSON.parse(JSON.stringify(device_settings))
                ret.device_settings.enclosure_options = ["Cabinet", "Tent"]
                    delete ret.device_settings.deviceid
                delete ret.device_settings.automatic_control
                delete ret.device_settings.deviceid
                delete ret.device_settings.stationid
                delete ret.device_settings.userid
                delete ret.device_settings.controller_hostname
                delete ret.device_settings.controller_api_port
                delete ret.device_settings.stage
                delete ret.device_settings.light_on_hour
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

                ret.stage_schedules = stage.getStageSchedules(stationid)
                resolve(ret);
            }
        }})
    })
}


async function createStation(body) {
    return new Promise(function(resolve, reject) {
        pool.query("insert into station (" +
            "    userid_User," +
            "    controller_hostname," +
            "    controller_api_port," +
            "    stage," +
            "    light_on_hour," +
            "    tamper_xmove," +
            "    tamper_ymove," +
            "    tamper_zmove," +
//            "    time_between_pictures_in_seconds," +
//            "    camera_picamera," +
//            "    camera_resolutionX," +
//            "    camera_resolutionY," +
//            "    time_between_sensor_polling_in_seconds," +
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
            "    light_germinate)" +
            "values(" +
            "    $1," +
            "    '192.168.21.237'," +
            "    3003," +
            "    'idle'," +
            "    0," +
            "    1.0," +
            "    1.0," +
            "    1.0," +
//            "    300," +
//            "    false," +
//            "    2592," +
//            "    1944," +
//            "    90," +
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
            "    false" +
            ") RETURNING *",
            [body.userid], (error, results) => {
            if (error) {
                reject(error)
            } else {
                console.log("new stationid " + results.rows[0])
                resolve({stationid: results.rows[0].stationid, message: "A new station has been added :" + results.rows[0].stationid})
            }
        })
    })
}


async function updateStation(body) {
    return new Promise(function(resolve, reject) {
        pool.query("UPDATE station set " +
            "controller_hostname=$2, " +
            "controller_api_port=$3, " +
            "stage=$4, " +
            "light_on_hour=$5, " +
            "tamper_xmove=$6, " +
            "tamper_ymove=$7, " +
            "tamper_zmove=$8, " +
            "time_between_pictures_in_seconds=$9, " +
            "time_between_sensor_polling_in_seconds=$10, " +
            "humidifier=$11, " +
            "humidity_sensor_internal=$12, " +
            "humidity_sensor_external=$13, " +
            "heater=$14, " +
            "thermometer_top=$15, " +
            "thermometer_middle=$16, " +
            "thermometer_bottom=$17, " +
            "thermometer_external=$18, " +
            "thermometer_water=$19, " +
            "water_pump=$20, " +
            "air_pump=$21, " +
            "light_sensor_internal=$22, " +
            "station_door_sensor=$23, " +
            "outer_door_sensor=$24, " +
            "movement_sensor=$25, " +
            "pressure_sensors=$26, " +
            "root_ph_sensor=$27, " +
            "enclosure_type=$28, " +
            "water_level_sensor=$29, " +
            "tub_depth=$30, " +
            "tub_volume=$31, " +
            "intake_fan=$32, " +
            "exhaust_fan=$33, " +
            "heat_lamp=$34, " +
            "heating_pad=$35, " +
            "light_bloom=$36, " +
            "light_vegetative=$37, " +
            "light_germinate=$38 " +
        "where stationid=$1 RETURNING *",
            [
                body.stationid,
                body.controller_hostname,
                body.controller_api_port,
                body.stage,
                body.light_on_hour,
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
            body.light_germinate
        ], (error, results) => {
                if (error) {
                    console.log("update err " + error)
                    reject(error)
                } else {
                    console.log("updated "+results.rowCount+" rows of Station " + body.stationid)
                    resolve({stationid: body.stationid, rowcount: results.rowCount, message: "station has been modified :" + results.rowCount})
                }
            })
    })
}


async function deleteStation(stationid) {
    console.log("deleteStation "+stationid)
    return new Promise(function(resolve, reject) {
        console.log("DELETE FROM station WHERE stationid "+stationid)

        pool.query('DELETE FROM station WHERE stationid = $1', [stationid], (error, results) => {
            if (error) {
                console.error("delete stationid err3 " + error)
                reject(error)
            } else {
//                console.log("results " + JSON.stringify(results))
                resolve({stationid: stationid, rowcount: results.rowCount, message: 'station deleted with ID ' + stationid})
            }
        })
    })
}

async function setSensorPresent(stationid,sensor_name,present) {
    console.log("setSensorPresent "+sensor_name+" present " + present + " where stationid="+stationid)
    return new Promise( function(resolve, reject) {
        console.log("UPDATE station set "+sensor_name+" = "+present+" where stationid="+stationid)

        let ssql = 'UPDATE station set '+sensor_name+'=$2 where stationid = $1 RETURNING *'
        pool.query(ssql, [stationid, present], (error, results) => {
            if (error) {
                console.error("update stationid err3 " + error)
                reject(error)
            } else {
                console.log("setSensorPresent results " + JSON.stringify(results))
                resolve({stationid: stationid, rowcount: results.rowCount, message: 'station updated ' + results.rowCount})
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

