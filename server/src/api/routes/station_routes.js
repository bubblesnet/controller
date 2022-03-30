const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const station = require('../models/station')
const automation_settings = require('../models/automation_settings')

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

// Add a new station
router.post('/:station/stage', function (req, res) {
    let x = req.body
    let result = automation_settings.changeStage(req.params.station,x.oldstage,x.newstage ).then(function (rows) {
        if (!rows) {
            return res.status(200).json({});
        }
        return res.status(200).send(result);
    }).catch(function (err) {
        return res.status(500).send("There was a problem changing the stage - err " + err);
    });
});

module.exports = {
    router
};