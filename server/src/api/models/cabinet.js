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

async function findCabinetIDByDeviceID(deviceid) {
    return new Promise(function (resolve, reject) {
        console.log("deviceid = " + deviceid)
        let ssql = 'select distinct c.cabinetid from public.user u left outer join device d on u.userid = d.userid_user left outer join cabinet c on u.userid = c.userid_user where d.deviceid=$1'

        console.log("ssql = " + ssql)
        pool.query(ssql, [deviceid], async (err, results) => {
            if (err) {
                console.error("getConfigByCabinet error " + err)
                reject(err)
            } else {
                let cabinetid = results.rows[0].cabinetid
                console.log("found cabinetid " + cabinetid)
                resolve(cabinetid)
            }
        })
    })
}

async function getConfigByDevice(userid,deviceid) {
    let cabinetid = await findCabinetIDByDeviceID(deviceid)
    return (getConfigByCabinet(cabinetid, deviceid))
}

async function getConfigByCabinet(cabinetid, deviceid) {
    console.log("getConfigByCabinet " + cabinetid)
    return new Promise(function (resolve, reject) {
        console.log("cabinetid = " + cabinetid)
        let ssql = 'select * from cabinet c left outer join device d on d.cabinetid_cabinet = c.cabinetid where cabinetid=$1 order by cabinetid'
        console.log("ssql = " + ssql)
        pool.query(ssql, [cabinetid], async (err, results) => {
//            console.log("callback from getConfigByCabinet with err " + err + " results " + results)
            if (err) {
                console.error("getConfigByCabinet error " + err)
                reject(err)
            } else {
                if(results.rowCount === 0 ) {
                    reject( new Error("no config for cabinet " + cabinetid))
                } else {
                let ret = JSON.parse(JSON.stringify(results.rows[0]));
                ret.cabinetid = cabinetid
                ret.deviceid = deviceid
                ret.userid = ret.userid_user
                delete ret.userid_user
                let tamper = {xmove: ret.tamper_xmove, ymove: ret.tamper_ymove, zmove: ret.tamper_zmove}
                delete ret.tamper_xmove
                delete ret.tamper_ymove
                delete ret.tamper_zmove
                let camera = {
                    picamera: ret.camera_picamera,
                    resolutionX: ret.camera_resolutionx,
                    resolutionY: ret.camera_resolutiony
                }
                delete ret.camera_picamera
                delete ret.camera_resolutionx
                delete ret.camera_resolutiony
                let device_settings = JSON.parse(JSON.stringify(ret))
                ret.tamper = tamper
                ret.camera = camera
                ret.ac_outlets = await outlet.getOutletsByCabinet(cabinetid)
                ret.attached_devices = await modul.getAllModulesByCabinet(cabinetid)

                ret.device_settings = JSON.parse(JSON.stringify(device_settings))
                ret.device_settings.enclosure_options = ["Cabinet", "Tent"],
                    delete ret.device_settings.deviceid
                delete ret.device_settings.automatic_control
                delete ret.device_settings.deviceid
                delete ret.device_settings.cabinetid
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
                delete ret.cabinet_door_sensor
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

                ret.stage_schedules = stage.getStageSchedules(cabinetid)
                resolve(ret);
            }
        }})
    })
}


async function createCabinet(body) {
    return new Promise(function(resolve, reject) {
        pool.query("insert into cabinet (" +
            "    userid_User," +
            "    controller_hostname," +
            "    controller_api_port," +
            "    stage," +
            "    light_on_hour," +
            "    tamper_xmove," +
            "    tamper_ymove," +
            "    tamper_zmove," +
            "    time_between_pictures_in_seconds," +
            "    camera_picamera," +
            "    camera_resolutionX," +
            "    camera_resolutionY," +
            "    time_between_sensor_polling_in_seconds," +
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
            "    cabinet_door_sensor," +
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
            "    300," +
            "    false," +
            "    2592," +
            "    1944," +
            "    90," +
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
                console.log("new cabinetid " + results.rows[0])
                resolve({cabinetid: results.rows[0].cabinetid, message: "A new cabinet has been added :" + results.rows[0].cabinetid})
            }
        })
    })
}


async function updateCabinet(body) {
    return new Promise(function(resolve, reject) {
        pool.query("UPDATE cabinet set " +
            "controller_hostname=$2, "+
            "controller_api_port=$3, " +
            "stage=$4, " +
            "light_on_hour=$5, " +
            "tamper_xmove=$6, " +
            "tamper_ymove=$7, " +
            "tamper_zmove=$8, " +
            "time_between_pictures_in_seconds=$9, " +
            "camera_picamera=$10, " +
            "camera_resolutionX=$11, " +
            "camera_resolutionY=$12, " +
            "time_between_sensor_polling_in_seconds=$13, " +
            "humidifier=$14, " +
            "humidity_sensor_internal=$15, " +
            "humidity_sensor_external=$16, " +
            "heater=$17, " +
            "thermometer_top=$18, " +
            "thermometer_middle=$19, " +
            "thermometer_bottom=$20, " +
            "thermometer_external=$21, " +
            "thermometer_water=$22, " +
            "water_pump=$23, " +
            "air_pump=$24, " +
            "light_sensor_internal=$25, " +
            "cabinet_door_sensor=$26, " +
            "outer_door_sensor=$27, " +
            "movement_sensor=$28, " +
            "pressure_sensors=$29, " +
            "root_ph_sensor=$30, " +
            "enclosure_type=$31, " +
            "water_level_sensor=$32, " +
            "tub_depth=$33, " +
            "tub_volume=$34, " +
            "intake_fan=$35, " +
            "exhaust_fan=$36, " +
            "heat_lamp=$37, " +
            "heating_pad=$38, " +
            "light_bloom=$39, " +
            "light_vegetative=$40, " +
            "light_germinate=$41 " +
        "where cabinetid=$1 RETURNING *",
            [
                body.cabinetid,
                body.controller_hostname,
                body.controller_api_port,
                body.stage,
                body.light_on_hour,
                body.tamper_xmove,
            body.tamper_ymove,
            body.tamper_zmove,
            body.time_between_pictures_in_seconds,
            body.camera_picamera,
            body.camera_resolutionX,
            body.camera_resolutionY,
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
            body.cabinet_door_sensor,
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
                    console.log("updated "+results.rowCount+" rows of Cabinet " + body.cabinetid)
                    resolve({cabinetid: body.cabinetid, rowcount: results.rowCount, message: "cabinet has been modified :" + results.rowCount})
                }
            })
    })
}


async function deleteCabinet(cabinetid) {
    console.log("deleteCabinet "+cabinetid)
    return new Promise(function(resolve, reject) {
        console.log("DELETE FROM cabinet WHERE cabinetid "+cabinetid)

        pool.query('DELETE FROM cabinet WHERE cabinetid = $1', [cabinetid], (error, results) => {
            if (error) {
                console.error("delete cabinetid err3 " + error)
                reject(error)
            } else {
//                console.log("results " + JSON.stringify(results))
                resolve({cabinetid: cabinetid, rowcount: results.rowCount, message: 'cabinet deleted with ID ' + cabinetid})
            }
        })
    })
}



module.exports = {
//    getAllCabinets,
    createCabinet,
//    findAllByUserid,
    deleteCabinet,
    updateCabinet,
    getConfigByCabinet,
    getConfigByDevice,
    endPool,
}

