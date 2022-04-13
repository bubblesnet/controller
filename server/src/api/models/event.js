// copyright and license inspection - no issues 4/13/22

const locals = require("../../config/locals");

const server_db = require('./bubbles_db')
const db = require("./database");
const {sql} = require("@databases/pg");
const stage = require("./stage");
const pool = server_db.getPool()
const endPool = () => {
    pool.end()
}
let good_userid = 0
let good_deviceid = 0


async function createEvent(event) {
    return new Promise(function(resolve, reject) {
        console.log("inserting new event "+JSON.stringify(event))

        if( event.siteid == 0 ) { /// TODO fix error handling and get rid of this hack
            event.siteid = 1
        }

        pool.query("INSERT INTO event (userid_User, " +
            "deviceid_Device, stationid_Station, siteid_Site, datetimemillis, type, message, subeventdatemillis, floatvalue, intvalue, stringvalue, textvalue, rawjson, time, filename, units, value_name) " +
            "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *",
            [event.userid, event.deviceid, event.stationid, event.siteid,  event.datetimemillis, event.type, event.message, event.subeventdatetimemillis,
            event.floatvalue, event.intvalue, event.stringvalue, event.textvalue, event.rawjson, event.time, event.filename, event.units, event.value_name], (error, results) => {
                if (error) {
                    reject(error)
                } else {
//                    console.log("new event " + results.rows[0])
                    resolve({eventid: results.rows[0].eventid, message: "A new event has been added :" + results.rows[0].eventid})
                }
            })
    });
}

async function getLastN(stationid, count,  exclude_measurement) {
    console.log("getLastN "+stationid+' '+count+' ' + exclude_measurement)
    let query = sql`SELECT * FROM event where stationid_station=${stationid} ORDER BY datetimemillis DESC LIMIT ${count}`
    if( exclude_measurement === true ) {
        query = sql`SELECT * FROM event where stationid_station=${stationid} AND type != 'measurement' ORDER BY datetimemillis DESC LIMIT ${count}`
        console.log(query)
    }
    let results = await db.query(query);
//    console.log("\n\n\n"+JSON.stringify(results))
    return(results)
}

module.exports = {
    createEvent:createEvent,
    getLastN: getLastN
}