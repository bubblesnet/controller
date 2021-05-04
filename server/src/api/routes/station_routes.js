const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors')
const station = require('../models/station')

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
const DeviceModel = require('../models/device');

// GETS A LIST of STATION FROM THE DATABASE BY SITEID - normal case
router.get('/site/:siteid', function (req, res) {
    let result = getStationsBySiteId(req,res)
});

// GETS A LIST of STATION FROM THE DATABASE BY SITEID - normal case
router.put('/site/:siteid/:station', function (req, res) {
    let result = station.addStation(req.params.station,req.params.siteid).then(function (rows) {
        if (!rows)
            return res.status(200).send("{}");
        return res.status(200).send(result);
    }).catch(function (err) {
        return res.status(500).send("There was a problem adding the station - err " + err);
    });
});


function getStationsBySiteId( req, res ) {
    console.log("getStationsBySiteId")
    station.getStationConfigsBySite(req.params.siteid).then( function ( stationlist) {
        if (!stationlist) return res.status(200).send("{}");
        return res.status(200).send(stationlist);
    }).catch(function(err) {
        return res.status(500).send("There was a problem finding the devices - err "+err);
    });
}

module.exports = {
    router
};