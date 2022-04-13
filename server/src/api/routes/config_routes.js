// copyright and license inspection - no issues 4/13/22

const express = require('express');
const router = express.Router();
const util = require('../../util')
const station = require('../models/station')
const sitestation = require('../models/sitestation')

/**
 * @api {post} /measurement/:userid/:deviceid Get the last reported status from specified device
 * @apiName GetStatus
 * @apiGroup Measurement
 *
 * @apiParam {Number} userid User's unique ID.
 * @apiParam {Number} deviceid Device's unique ID.
 *
 * @apiSuccess {XXXX} XXXX XXXX
 */


async function getDeviceConfig(req,res,next) {
    console.log("get device config user: " + req.params.userid + " device: " + req.params.deviceid);
    // read config from file
//    let x = await station.getConfigByDevice(req.params.userid, req.params.deviceid).catch((err) =>
    let x = await station.getConfigByUser(req.params.userid).catch((err) =>
    { console.log("caught err "+err)})
    console.log("got x = " + JSON.stringify(x))
    res.json(x);
}

async function setPresent(req) {
    let x = await sitestation.setSensorPresent(req.params.stationid,req.params.sensor_name,req.params.present)
    return(x)
}

router.post("/:userid/:stationid/sensor/:sensor_name/:present", function (req, res, next) {
    let x = setPresent(req)
    res.json(x);
});

router.get("/:userid/:deviceid", function (req, res, next) {
    getDeviceConfig(req,res,next)
});

router.get("/site/:userid/:deviceid", function (req, res, next) {
    getDeviceConfig(req,res,next)
});

function getModules( req, res, next ) {
    // read config from file
    let filepath = "jsondata/module_types.json"
    res.json(util.readJsonFile(filepath));
}

router.get("/modules", function (req, res, next) {
    getModules(req,res,next)
});

function getContainers( req, res, next ) {
    // read config from file
    let filepath = "src" + "/" + "./container_names.json"
    res.json(util.readJsonFile(filepath));
}

router.get("/containers", function (req, res, next) {
    getContainers(req,res,next)
});

module.exports = {
    getDeviceConfig,
    getContainers,
    getModules,
    router
};
