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

const db = require("./database");
const {sql} = require("@databases/pg");
const device = require("./device");

async function getAutomationStage( stationid, stage) {
        log.info("getAutomationStage "+stationid+"/"+stage)
        return new Promise(async function (resolve, reject) {
            const results = await db.query(sql`SELECT * from automationsettings where stationid_Station=${stationid} and stage_name=${stage}`);
            log.info("getAutomationStage returning "+JSON.stringify(results))
            resolve( results[0] )
        })
}

async function getStageSchedules(stationid) {
    return new Promise(async function (resolve, reject) {
        const results = await db.query(sql`SELECT * from automationsettings where stationid_Station=${stationid}`);
        log.info("getStageSchedules returning "+JSON.stringify(results))
        let skeds = []
        for( let i = 0; i < results.length; i++ ){
            let sked = {
                name: results[i].stage_name,
                hours_of_light: results[i].hours_of_light,
                light_on_start_hour: results[i].light_on_start_hour,
                environmental_targets: {
                    humidity: results[i].target_humidity,
                    temperature: results[i].target_temperature,
                    water_temperature: results[i].target_water_temperature
                }
            }
            skeds.push( sked )
            log.info("Adding sked " + JSON.stringify(sked))
        }
        resolve(skeds)
    })
}

module.exports = {
    getStageSchedules,
    getAutomationStage
}