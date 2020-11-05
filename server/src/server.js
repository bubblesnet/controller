const express = require('express')
const path = require('path');
const app = express()
const port  = normalizePort(process.env.PORT || '3000')

const testrun_model = require('./testrun_model')
const devicestatus_model = require('./devicestatus_model')
const metrics_model = require('./metrics_model')
const sbc_model = require('./sbc_model')
const testqueue_model = require('./testqueue_model')

app.locals.config = require('./conf/locals.js');
app.locals.units = require('./routes/units.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/devicestatus/:id', (req, res) => {
    console.log("getDeviceStatus")
    devicestatus_model.getDeviceStatus(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/metrics/all', (req, res) => {
    metrics_model.getAllMetrics()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/sbc/all', (req, res) => {
    sbc_model.getSbcs()
        .then(response => {
//            console.log(response)
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/testruns', (req, res) => {
    testrun_model.getTestRuns()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/testqueue/:language', (req, res) => {
    testqueue_model.getAll(req.params.language)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            console.log(error)
            res.status(500).send(error);
        })
})

app.put('/sbc/', (req, res) => {
    console.log("put /sbc params " + JSON.stringify(req.params))
    sbc_model.createEmptySbc(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.put('/sbc/:id', (req, res) => {
    console.log("put /sbc/"+ req.params.id + " body = " + JSON.stringify(req.body) + " params " + JSON.stringify(req.params))
    sbc_model.updateSbc(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.put('/project/retest/:id', (req, res) => {
    console.log("put /project/retest/"+ req.params.id + " body = " + JSON.stringify(req.body) + " params " + JSON.stringify(req.params))
    testqueue_model.clearRetest(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/testruns/retest', (req, res) => {
    testrun_model.retestTestRun(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.delete('/sbc/:id', (req, res) => {
    console.log("delete "+req.params.id)
    sbc_model.deleteSbc(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.delete('/testruns/:id', (req, res) => {
    testrun_model.deleteMerchant(req.params.id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})


var locals = require('./conf/locals');
var fs = require('fs');
var db = require('./routes/db');
const disk = require('diskspace');
var sprintf = require('sprintf-js').sprintf;

var htmlDecode = require("js-htmlencode").htmlDecode;

// var locals = require("../conf/locals");
// var fs = require("fs");
const dgram = require("dgram");

/* GET users listing. */
app.get("/api/status/:userid/:deviceid", function (req, res, next) {
    console.log("api/status user: " + req.params.userid + " device: " + req.params.deviceid);
    status.status(req.params.userid, req.params.deviceid, function (obj) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(obj);
    });
});

/* GET users listing. */
app.get("/api/power/:userid/:deviceid/:outletname/:onoff", function (req, res, next) {
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

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
