var express = require("express");
var router = express.Router();
var htmlDecode = require("js-htmlencode").htmlDecode;
var db = require("./db");

// var locals = require("../conf/locals");
// var fs = require("fs");
const dgram = require("dgram");

/* GET users listing. */
router.get("/command/:userid/:deviceid/:outletname/:onoff", function (req, res, next) {
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
        res.redirect("/status/" + req.params.userid + "/" + req.params.deviceid);
    });
    client.on("error", function (err) {
        console.log("Error: " + err);
        res.redirect("/status/" + req.params.userid + "/" + req.params.deviceid);
    });

    db.getLastKnownIPAddress(req.params.userid, req.params.deviceid, function (err, eventresult) {
        console.log("sending message " + JSON.stringify(outboundmessage) + " to " + eventresult[0].stringvalue + ":8777");
        client.send(JSON.stringify(outboundmessage), 8777, eventresult[0].stringvalue);
    });
});

module.exports = router;
