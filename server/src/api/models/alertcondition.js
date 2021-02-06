const locals = require("../../config/locals");

const server_db = require('./bubbles_db')
const pool = server_db.getPool()
const endPool = () => {
    pool.end()
}


async function createAlertCondition(alert) {
    return new Promise(function(resolve, reject) {
        console.log("inserting new alertcondition "+JSON.stringify(alert))

        pool.query("INSERT INTO alertcondition (shortmessage, longmessage, userid_User, " +
            "deviceid_Device, triggered_datetimemillis, eventid_Event) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
                [alert.shortmessage, alert.longmessage, alert.userid,
            alert.deviceid, alert.triggered_datetimemillis, alert.eventid], (error, results) => {
            if (error) {
                console.log("rejecting with error " + error)
                reject(error)
            } else {
                console.log("new alertcondition " + results.rows[0])
                resolve({alertcondition: results.rows[0].alertconditionid, message: "A new alertcondition has been added :" + results.rows[0].alertconditionid})
            }
        })
    })
}

module.exports = {
    createAlertCondition:createAlertCondition
}