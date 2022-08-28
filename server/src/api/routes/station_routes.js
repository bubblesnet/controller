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

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const station = require('../models/station')
const events = require('../models/event')
const automation_settings = require('../models/automation_settings')
const stage = require('../models/stage')

router.use(bodyParser.urlencoded({ extended: true }));
const DeviceModel = require('../models/device');

// Add a new station
router.put('/site/:siteid/:station', function (req, res) {
    let result = station.addStation(req.params.station,req.params.siteid).then(function (rows) {
        if (!rows)
            return res.status(200).json({});
        return res.status(200).send(result);
    }).catch(function (err) {
        return res.status(500).send("There was a problem adding the station - err " + err);
    });
});


function getStationsBySiteId( req, res ) {
    log.info("getStationsBySiteId")
    station.getStationConfigsBySite(req.params.siteid).then( function ( stationlist) {
        if (!stationlist) return res.status(200).json({});
        return res.status(200).send(stationlist);
    }).catch(function(err) {
        return res.status(500).send("There was a problem finding the devices - err "+err);
    });
}

//
router.post('/:stationid/stage', function (req, res) {
    let x = req.body
    let result = automation_settings.changeStage(req.params.stationid,x.oldstage,x.newstage ).then(function (rows) {
        if (!rows) {
            return res.status(200).json({});
        }
        return res.status(200).send(result);
    }).catch(function (err) {
        return res.status(500).send("There was a problem changing the stage - err " + err);
    });
});

async function getLastNEvents(req,res,next) {
    log.info("get events : " + req.params.stationid);
    let exclude_measurement = true
    let x = await events.getLastN(req.params.stationid, 100, exclude_measurement).catch((err) =>
    { log.error("caught err "+err)})
//    console.log("got x = " + JSON.stringify(x))
    res.json(x);
}

router.get('/:stationid/events', function (req, res, next) {
    log.info("get stationid/events "+req.params.stationid)
    let x = req.body
    getLastNEvents(req, res, next )
});

async function getAutomationStage(req,res,next) {
    log.info("get getAutomationStage : " + req.params.stationid+"/automation/"+req.params.stage_name);
    let exclude_measurement = true
    let x = await stage.getAutomationStage(req.params.stationid, req.params.stage_name).catch((err) =>
    { log.error("caught err "+err)})
//    console.log("got x = " + JSON.stringify(x))
    res.json(x);
}

router.get('/:stationid/stage/:stage_name', function (req, res, next) {
    log.info("GET "+req.params.stationid+"/automation/"+req.params.stage_name)
    let x = req.body
    getAutomationStage(req, res, next )
});


module.exports = {
    router
};