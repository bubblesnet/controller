// copyright and license inspection - no issues 4/13/22

var express = require('express');
var router = express.Router();
var status = require('../services/status');
var htmlDecode = require("js-htmlencode").htmlDecode;
var db = require("../models/bubbles_db");
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
        console.log("asyncstatusbyuserdevice user: " + req.params.userid + " device: " + req.params.deviceid);
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
    console.log("command userid " + req.params.userid + " deviceid " + req.params.deviceid + " outletname " + req.params.outletname + " onoff " + req.params.onoff);
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
        console.log('UDP Server listening on ' + address.address + ":" + address.port);
    });

    client.on('message', function (message, remote) {
        console.log(remote.address + ':' + remote.port + ' - ' + message);
        let returnmessage = JSON.parse(message);
        client.close();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(returnmessage);
    });

    client.on("error", function (err) {
        client.close();
        console.error("Error: " + err);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json("{ \"error\": \"" + err + "\"}");
    });

    db.getLastKnownIPAddress(req.params.userid, req.params.deviceid, function (err, eventresult) {
        console.log("db.getLastKnownIPAddress")
        if( !err && eventresult && eventresult[0] ) {
            console.log("sending message " + JSON.stringify(outboundmessage) + " to " + eventresult[0].stringvalue + ":8777");
            client.send(JSON.stringify(outboundmessage), 8777, eventresult[0].stringvalue);
        }
        else {
            console.error("Failed to find IP address to send command to!!");
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
