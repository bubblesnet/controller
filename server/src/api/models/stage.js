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

const db = require("./database");
const {sql} = require("@databases/pg");
const device = require("./device");


stage_schedules =  [
    {
        "name": "idle",
        "hours_of_light": 0,
        "environmental_targets": {
            "humidity": 0,
            "temperature": 0,
            "water_temperature": 0
        }
    },
    {
        "name": "germination",
        "hours_of_light": 0,
        "environmental_targets": {
            "humidity": 30,
            "temperature": 81,
            "water_temperature": 68
        }
    },
    {
        "name": "seedling",
        "hours_of_light": 18,
        "environmental_targets": {
            "humidity": 60,
            "temperature": 80,
            "water_temperature": 61
       }
    },
    {
        "name": "vegetative",
        "hours_of_light": 12,
        "environmental_targets": {
            "humidity": 60,
            "temperature": 80,
            "water_temperature": 61
        }
    },
    {
        "name": "bloom",
        "hours_of_light": 12,
        "environmental_targets": {
            "humidity": 60,
            "temperature": 80,
            "water_temperature": 61
        }
    },
    {
        "name": "dry",
        "hours_of_light": 0,
        "environmental_targets": {
            "humidity": 60,
            "temperature": 80,
            "water_temperature": 0
        }
    },
    {
        "name": "cure",
        "hours_of_light": 0,
        "environmental_targets": {
            "humidity": 60,
            "temperature": 80,
            "water_temperature": 0
        }
    }
];

async function getAutomationStage( stationid, stage) {
        console.log("getAutomationStage "+stationid+"/"+stage)
        return new Promise(async function (resolve, reject) {
            const results = await db.query(sql`SELECT * from automationsettings where stationid_Station=${stationid} and stage_name=${stage}`);
            console.log("getAutomationStage returning "+JSON.stringify(results))
            resolve( results[0] )
        })
}

function getStageSchedules(stationid) {
    return stage_schedules
}

module.exports = {
    getStageSchedules,
    getAutomationStage
}