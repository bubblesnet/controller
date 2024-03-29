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
const status = require('../services/status');
const htmlDecode = require("js-htmlencode").htmlDecode;
const db = require("../models/bubbles_db");
const dgram = require("dgram");

/**
 * @api {get} /status/:userid/:deviceid Get the last reported status from specified device
 * @apiName GetStatus
 * @apiGroup Status
 *
 * @apiParam {Number} userid User's unique ID.
 * @apiParam {Number} deviceid Device's unique ID.
 *
 * @apiSuccess {XXXX} XXXX XXXX
 */
router.get("/status/:userid/:deviceid", function (req, res, next) {
        log.info("asyncstatusbyuserdevice user: " + req.params.userid + " device: " + req.params.deviceid);
        status.status(req.params.userid, req.params.deviceid, function (obj) {
        res.render("asyncstatus", obj);
    });
});


/**
 * @api {get} /command/:userid/:deviceid/:outletname/:onoff Turn outlet on/off
 * @apiName SetOutletOnOff
 * @apiGroup Command
 *
 * @apiParam {Number} userid User's unique ID.
 * @apiParam {Number} deviceid User's unique ID.
 * @apiParam {String} outletname User's unique ID.
 * @apiParam {String} onoff User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

function getDeviceOutlets( client, req, res, next ) {
    log.info("command userid " + req.params.userid + " deviceid " + req.params.deviceid + " outletname " + req.params.outletname + " onoff " + req.params.onoff);
    let outletname = htmlDecode(req.params.outletname);
    let outboundmessage = {
        onoff: req.params.onoff,
        outletName: outletname,
        messageType: "outletcontrol",
        msgid: "1490238706222",
        protocolVersion: "1"
    };

    client.on('listening', function () {
        let address = client.address();
        log.info('UDP Server listening on ' + address.address + ":" + address.port);
    });

    client.on('message', function (message, remote) {
        log.info(remote.address + ':' + remote.port + ' - ' + message);
        let returnmessage = JSON.parse(message);
        client.close();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(returnmessage);
    });

    client.on("error", function (err) {
        client.close();
        log.error("Error: " + err);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json("{ \"error\": \"" + err + "\"}");
    });

    db.getLastKnownIPAddress(req.params.userid, req.params.deviceid, function (err, eventresult) {
        log.info("db.getLastKnownIPAddress")
        if( !err && eventresult && eventresult[0] ) {
            log.info("sending message " + JSON.stringify(outboundmessage) + " to " + eventresult[0].stringvalue + ":8777");
            client.send(JSON.stringify(outboundmessage), 8777, eventresult[0].stringvalue);
        }
        else {
            log.error("Failed to find IP address to send command to!!");
        }
    });
}

router.get("/power/:userid/:deviceid/:outletname/:onoff", function (req, res, next) {
    const client = dgram.createSocket('udp4');
    getDeviceOutlets(client, req,res,next)
});


module.exports = {
    getDeviceOutlets,
    router
};
