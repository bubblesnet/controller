// copyright and license inspection - no issues 4/13/22


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
    console.log("getStationsBySiteId")
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
    console.log("get events : " + req.params.stationid);
    let exclude_measurement = true
    let x = await events.getLastN(req.params.stationid, 100, exclude_measurement).catch((err) =>
    { console.log("caught err "+err)})
//    console.log("got x = " + JSON.stringify(x))
    res.json(x);
}

router.get('/:stationid/events', function (req, res, next) {
    console.log("get stationid/events "+req.params.stationid)
    let x = req.body
    getLastNEvents(req, res, next )
});

async function getAutomationStage(req,res,next) {
    console.log("get getAutomationStage : " + req.params.stationid+"/automation/"+req.params.stage_name);
    let exclude_measurement = true
    let x = await stage.getAutomationStage(req.params.stationid, req.params.stage_name).catch((err) =>
    { console.log("caught err "+err)})
//    console.log("got x = " + JSON.stringify(x))
    res.json(x);
}

router.get('/:stationid/stage/:stage_name', function (req, res, next) {
    console.log("GET "+req.params.stationid+"/automation/"+req.params.stage_name)
    let x = req.body
    getAutomationStage(req, res, next )
});


module.exports = {
    router
};