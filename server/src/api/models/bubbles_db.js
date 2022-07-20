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
const db = require("./database");
const {sql} = require("@databases/pg");

const Pool = require('pg').Pool

console.log('Creating initial bubbles database connection to '+JSON.stringify(locals.getLocals(true).bubbles_db_config));

let pool
try {
    pool = new Pool(localconfig.bubbles_db_config);
} catch(e) {
    console.log("No database connection " + e)
    process.exit(1)
}


exports.getPool = () => {
    return(pool)
}

exports.testConnection = async function(failfunc) {
    console.log("testConnection")
    return new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM SITE",
            function (err, results) {
                if (err) {
                    failfunc(err)
                } else {
                    resolve(results)
                }
            }
        )
    })
}


exports.getLastKnownIPAddress = async function (userid, deviceid, cb) {
    console.log("db.getLastKnownIPAddress " + userid + "/" + deviceid);
    console.log("getLastKnownIPAddress select * from currentevent where userid_user = " + userid + " AND deviceid_device = " + deviceid + " AND (type = 'SYSTEM_START') and stringvalue <> 'null' order by datetimemillis desc LIMIT 1;");
    return new Promise(function(resolve, reject) {
        pool.query("select * from currentevent where userid_user = $1 AND deviceid_device = $2 AND type = 'SYSTEM_START' and stringvalue <> 'null' order by datetimemillis desc LIMIT 1", [userid, deviceid],
            function (err, eventresult) {
            console.log('getLastKnownIPAddress select event returned err ' + err + ' eventresult ' + eventresult);
            console.log('getLastKnownIPAddress getEvent results = ' + JSON.stringify(eventresult));
            resolve( cb(err, eventresult));
        });
    })
};

