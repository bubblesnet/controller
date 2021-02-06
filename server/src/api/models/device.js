const locals = require("../../config/locals");
const bcrypt = require('bcryptjs');

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


async function findAllByUserid(userid) {
    console.log("findAllByUserid")
    return new Promise(function (resolve, reject) {
        console.log("userid = " + userid)
        let ssql = 'select * from device where userid_user = $1 order by deviceid'
        console.log("ssql = "+ssql)
        let values = [userid]
        pool.query(ssql, values, (err, results) => {
//            console.log("callback from findAllByUserid with err " + err + " results " + results)
            if (err) {
                console.log("findAllByUserid error " + err)
                reject(err)
            }
            else if (results && results.rowCount > 0) {
                console.log("resolving with results row 0 = " + JSON.stringify(results.rows[0]))
                resolve(results.rows);
            } else {
                //               reject("no data")
                console.log("no devices found for userid " + userid)
                resolve(null);
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
        pool.query("INSERT INTO device (devicename, devicetypeid_Devicetype, userid_User,created) VALUES ($1,$2,$3,current_timestamp) RETURNING *",
            [body.devicename, body.devicetypeid, body.userid], (error, results) => {
            if (error) {
                reject(error)
            } else {
                console.log("new deviceid " + results.rows[0])
                resolve({deviceid: results.rows[0].deviceid, message: "A new device has been added :" + results.rows[0].deviceid})
            }
        })
    })
}

async function updateDevice(body) {
    body.passwordhash = bcrypt.hashSync(body.password, 8);
    return new Promise(function(resolve, reject) {
        pool.query("UPDATE public.user set firstname=$1,lastname=$2,passwordhash=$3, email=$4 where userid=$5 RETURNING *",
            [body.firstname, body.lastname, body.passwordhash, body.email, body.userid], (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    console.log("updated email " + body.email)
                    resolve({userid: results.rows[0].userid, message: "user has been modified :" + results.rowCount})
                }
            })
    })
}

async function deleteDevice(deviceid) {
    console.log("deleteDevice "+deviceid)
    return new Promise(function(resolve, reject) {
        console.log("DELETE FROM device WHERE deviceid "+deviceid)

        pool.query('DELETE FROM device WHERE deviceid = $1', [deviceid], (error, results) => {
            if (error) {
                console.log("deviceid err3 " + error)
                reject(error)
            } else {
                console.log("results " + JSON.stringify(results))
                resolve({userid: id, message: 'device deleted with ID ' + deviceid})
            }
        })
    })
}

module.exports = {
    getAllDevices: getAllDevices,
    createDevice: createDevice,
    findAllByUserid: findAllByUserid,
    deleteDevice: deleteDevice,
    endPool: endPool,
}

