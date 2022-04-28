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