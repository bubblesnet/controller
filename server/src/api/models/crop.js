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
const log = require("../../bubbles_logger").log

const locals = require("../../config/locals");

const server_db = require('./bubbles_db')
const db = require("./database");
const {sql} = require("@databases/pg");
const stage = require("./stage");
const pool = server_db.getPool()

const endPool = () => {
    pool.end()
}

async function getCurrentByStation(stationid) {
    log.info("getCurrentByStation "+stationid)
    let query = sql`SELECT * FROM crop c join plant p on p.cropid_crop=c.cropid join seed s on p.seedid_seed=s.seedid where c.stationid_station=1`
    let results = await db.query(query);
//    log.info("\n\n\n"+JSON.stringify(results))
    let crop = {
        cropid: results[0].cropid,
        stationid_station: results[0].stationid_station,
        startdatetime_millis: results[0].startdatetime_millis,
        plants: results
    }
    return(crop)
}

module.exports = {
    getCurrentByStation: getCurrentByStation
}