const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors')

const VerifyToken = require('../services/verify_token');

router.use(bodyParser.urlencoded({ extended: true }));
const DeviceModel = require('../models/device');

/// TODO shouldn't need this once packaged
router.use(cors());

function getDevicesByStationId( req, res ) {
    DeviceModel.getDevicesByStationId(req.params.stationid).then( function ( devicelist) {
        if (!devicelist) return res.status(401).send("No devices found.");
        return res.status(200).send(devicelist);
    }).catch(function(err) {
        return res.status(500).send("There was a problem finding the devices - err "+err);
    });
}

function getDevicesByUserId( req, res ) {
    DeviceModel.getDevicesByUserId(req.params.userid).then( function ( devicelist) {
        if (!devicelist) return res.status(401).send("No devices found.");
        return res.status(200).send(devicelist);
    }).catch(function(err) {
        return res.status(500).send("There was a problem finding the devices - err "+err);
    });
}

// GETS A LIST of DEVICE FROM THE DATABASE BY userID - normal case
router.get('/:userid', function (req, res) {
    getDevicesByUserId(req,res)
});

// GETS A LIST of DEVICE FROM THE DATABASE BY userID - normal case
router.get('/station/:stationid', function (req, res) {
    getDevicesByStationId(req,res)
});


module.exports = {
    getDevicesByStationId,
    getDevicesByUserId,
    router
};