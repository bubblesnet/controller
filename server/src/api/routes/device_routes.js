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
const bodyParser = require('body-parser');


const VerifyToken = require('../services/verify_token');

router.use(bodyParser.urlencoded({ extended: true }));
const DeviceModel = require('../models/device');

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