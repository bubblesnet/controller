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
