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
                console.error("rejecting with error " + error)
                reject(error)
            } else {
                console.log("new alertcondition " + results.rows[0])
                resolve({alertcondition: results.rows[0].alertconditionid, message: "A new alertcondition has been added :" + results.rows[0].alertconditionid})
            }
        })
    })
}

async function getNewAlertConditions () {
    console.log('db.getNewAlertConditions ');
    return new Promise(function (resolve, reject) {
        pool.query('select * from alertcondition a join usersettings u on a.userid_User = u.userid_User join public.user us on a.userid_User = us.userid left outer join event e on e.eventid=a.eventid_Event where alertconditionid not in (select alertconditionid_Alertcondition from notification where alertconditionid_Alertcondition is not null)',
            [], function (err, result) {
                console.log('select new alert conditions returned err ' + err + ' result ' + result);
                console.log('select new alert conditions results = ' + JSON.stringify(result.rows));
                if (err != null) {
                    reject(err);
                } else {
                    resolve(result)
                }
            });
    })
}



module.exports = {
    createAlertCondition:createAlertCondition,
    getNewAlertConditions
}