const locals = require("../../config/locals");

const server_db = require('./bubbles_db')
const pool = server_db.getPool()
const endPool = () => {
    pool.end()
}
let good_userid = 0
let good_deviceid = 0


async function createEvent(event) {
    return new Promise(function(resolve, reject) {
 //       console.log("inserting new event "+JSON.stringify(event))

        pool.query("INSERT INTO event (userid_User, " +
            "deviceid_Device, datetimemillis, type, message, subeventdatemillis, floatvalue, intvalue, stringvalue, textvalue, rawjson, time, filename) " +
            "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *",
            [event.userid, event.deviceid, event.datetimemillis, event.type, event.message, event.subeventdatetimemillis,
            event.floatvalue, event.intvalue, event.stringvalue, event.textvalue, event.rawjson, event.time, event.filename], (error, results) => {
                if (error) {
                    reject(error)
                } else {
//                    console.log("new event " + results.rows[0])
                    resolve({eventid: results.rows[0].eventid, message: "A new event has been added :" + results.rows[0].eventid})
                }
            })
    });
}

module.exports = {
    createEvent:createEvent
}