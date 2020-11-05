var express = require('express');
var status = require('./status');
var router = express.Router();
var locals = require('../conf/locals');
var fs = require('fs');
var db = require('../routes/db');
const disk = require('diskspace');
var sprintf = require('sprintf-js').sprintf;

var htmlDecode = require("js-htmlencode").htmlDecode;

// var locals = require("../conf/locals");
// var fs = require("fs");
const dgram = require("dgram");

/* GET users listing. */
router.get("/api/status/:userid/:deviceid", function (req, res, next) {
    console.log("api/status user: " + req.params.userid + " device: " + req.params.deviceid);
    status.status(req.params.userid, req.params.deviceid, function (obj) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(obj);
    });
});

/* GET users listing. */
router.get("/api/power/:userid/:deviceid/:outletname/:onoff", function (req, res, next) {
    console.log("command userid " + req.params.userid + " deviceid " + req.params.deviceid + " outletname " + req.params.outletname + " onoff " + req.params.onoff);
    var outletname = htmlDecode(req.params.outletname);
    var outboundmessage = {
        onoff: req.params.onoff,
        outletName: outletname,
        messageType: "outletcontrol",
        msgid: "1490238706222",
        protocolVersion: "1"
    };

    const client = dgram.createSocket('udp4');

    client.on('listening', function () {
        var address = client.address();
        console.log('UDP Server listening on ' + address.address + ":" + address.port);
    });

    client.on('message', function (message, remote) {
        console.log(remote.address + ':' + remote.port + ' - ' + message);
        var returnmessage = JSON.parse(message);
        client.close();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(returnmessage);
    });
    client.on("error", function (err) {
        client.close();
        console.log("Error: " + err);
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
            console.log("Failed to find IP address to send command to!!");
        }
    });
});

module.exports = router;