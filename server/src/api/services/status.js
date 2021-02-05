var express = require('express');
var locals = require('../../config/locals');
var fs = require('fs');
var db = require('../models/bubbles_db');
const disk = require('diskspace');
var sprintf = require('sprintf-js').sprintf;

/* GET users listing. */
exports.status = function (userid, deviceid, cb) {
        console.log("statusbyuserdevice user: " + userid + " device: " + deviceid);
        /*

        var userdirectory = locals.getLocals().usersdirectory + '/' + userid;
        disk.check(locals.getLocals().deviceForDiskCheck, function (err, result) {
                console.log(result.free);
                console.log(result.total);

                var file = "";
                console.log("reading status from " + file);
//  console.log("files = " + JSON.stringify(files));
                try {
                    db.getCurrentStatusFile(userid, deviceid, function (err, eventresult) {
                        if (eventresult && eventresult[0]) {
                            file = userdirectory + '/bubblesstatus/' + eventresult[0].filename;

                            var obj = JSON.parse(fs.readFileSync(file, 'utf8'));
                            obj.title = "Growbox Status";
                            obj.bubbles[0].currentStatusFilename = eventresult[0].filename;
                            console.log('successfully read json file');
                            console.log(JSON.stringify(obj));
                            obj.bubbles[0].diskfreespace = sprintf("free: %1$uM %2$u%% total: %3$uG", (result.free / 1000000), ((result.free * 100) / result.total), (result.total / 1000000000));
                            if (obj.bubbles[0].lightStates.LEDGROWBLOOMING) {
                                if (obj.bubbles[0].lightStates.LEDGROWBLOOMING.onoff.toUpperCase() === "ON") {
                                    obj.bubbles[0].lightStates.LEDGROWBLOOMING.onofftoggle = "off";
                                }
                                else if (obj.bubbles[0].lightStates.LEDGROWBLOOMING.onoff.toUpperCase() === "OFF") {
                                    obj.bubbles[0].lightStates.LEDGROWBLOOMING.onofftoggle = "on";
                                }
                            }
                            if (obj.bubbles[0].lightStates.LEDGROWVEGETATIVE) {
                                if (obj.bubbles[0].lightStates.LEDGROWVEGETATIVE.onoff.toUpperCase() === "ON") {
                                    obj.bubbles[0].lightStates.LEDGROWVEGETATIVE.onofftoggle = "off";
                                }
                                else if (obj.bubbles[0].lightStates.LEDGROWVEGETATIVE.onoff.toUpperCase() === "OFF") {
                                    obj.bubbles[0].lightStates.LEDGROWVEGETATIVE.onofftoggle = "on";
                                }
                            }
                            if (obj.bubbles[0].lightStates.INCANDESCENTHEATnull) {
                                if (obj.bubbles[0].lightStates.INCANDESCENTHEATnull.onoff.toUpperCase() === "ON") {
                                    obj.bubbles[0].lightStates.INCANDESCENTHEATnull.onofftoggle = "off";
                                }
                                else if (obj.bubbles[0].lightStates.INCANDESCENTHEATnull.onoff.toUpperCase() === "OFF") {
                                    obj.bubbles[0].lightStates.INCANDESCENTHEATnull.onofftoggle = "on";
                                }
                            }
                            db.getCurrentPicture(userid, deviceid, function (err, eventresult) {
                                if (eventresult) {
                                    obj.bubbles[0].currentPictureFilename = eventresult[0].filename;
                                    obj.bubbles[0].currentPictureMillis = eventresult[0].datetimemillis;
                                }

                                db.getLastKnownIPAddress(userid, deviceid, function (err, eventresult) {
                                    if (eventresult) {
                                        obj.bubbles[0].ipaddress = eventresult[0].stringvalue;
                                    }
                                    console.log("got stringvalue " + eventresult[0].stringvalue);
                                    db.getLastDoorAction(userid, deviceid, "CABINET", function (err, eventresult) {
                                        console.log("called db callback with eventresult = " + JSON.stringify(eventresult));
                                        console.log("obj = " + JSON.stringify(obj));
                                        if (eventresult && obj.bubbles[0].doorStates.CABINET) {
                                            obj.bubbles[0].doorStates.CABINET.lastevent = eventresult[0];
                                        }

                                        db.getLastOutletAction(userid, deviceid, "Inlet Fan", function (err, outleteventresult1) {
                                            console.log("getLastOutletAction returned " + JSON.stringify(outleteventresult1));
                                            if (outleteventresult1 && outleteventresult1[0]) {
                                                console.log("getLastOutletAction Setting INLET.lastevent to " + JSON.stringify(outleteventresult1[0]));
                                                if (obj.bubbles[0].fans.INLET) {
                                                    if (obj.bubbles[0].fans.INLET.onoff.toUpperCase() === "ON") {
                                                        obj.bubbles[0].fans.INLET.onofftoggle = "off";
                                                    }
                                                    else {
                                                        obj.bubbles[0].fans.INLET.onofftoggle = "on";
                                                    }
                                                    obj.bubbles[0].fans.INLET.lastevent = outleteventresult1[0];
                                                }
                                            }
                                            db.getLastOutletAction(userid, deviceid, "Outlet Fan", function (err, outleteventresult2) {
                                                console.log("called db callback with eventresult = " + JSON.stringify(outleteventresult2));
                                                if (outleteventresult2 && outleteventresult2[0]) {
                                                    if (obj.bubbles[0].fans.OUTLET) {
                                                        if (obj.bubbles[0].fans.OUTLET.onoff.toUpperCase() === "ON") {
                                                            obj.bubbles[0].fans.OUTLET.onofftoggle = "off";
                                                        }
                                                        else {
                                                            obj.bubbles[0].fans.OUTLET.onofftoggle = "on";
                                                        }
                                                        obj.bubbles[0].fans.OUTLET.lastevent = outleteventresult2[0];
                                                    }
                                                }
                                                db.getLastOutletAction(userid, deviceid, "Air Pump", function (err, outleteventresult3) {
                                                    console.log("called db callback with eventresult = " + JSON.stringify(outleteventresult3));
                                                    if (outleteventresult3 && outleteventresult3[0]) {
                                                        if (obj.bubbles[0].airPumpMonitoredDevice.onoff.toUpperCase() === "ON") {
                                                            obj.bubbles[0].airPumpMonitoredDevice.onofftoggle = "off";
                                                        }
                                                        else {
                                                            obj.bubbles[0].airPumpMonitoredDevice.onofftoggle = "on";
                                                        }
                                                        obj.bubbles[0].airPumpMonitoredDevice.lastevent = outleteventresult3[0];
                                                    }
                                                    db.getLastOutletAction(userid, deviceid, "Humidifier", function (err, outleteventresult4) {
                                                        console.log("called db callback with eventresult = " + JSON.stringify(outleteventresult4));
                                                        if (outleteventresult4 && outleteventresult4[0]) {
                                                            if (obj.bubbles[0].humidifierMonitoredDevice.onoff.toUpperCase() === "ON") {
                                                                obj.bubbles[0].humidifierMonitoredDevice.onofftoggle = "off";
                                                            }
                                                            else {
                                                                obj.bubbles[0].humidifierMonitoredDevice.onofftoggle = "on";
                                                            }
                                                            obj.bubbles[0].humidifierMonitoredDevice.lastevent = outleteventresult4[0];
                                                        }
                                                        db.getLastOutletAction(userid, deviceid, "Water Pump", function (err, outleteventresult5) {
                                                            console.log("called db callback with eventresult = " + JSON.stringify(outleteventresult5));
                                                            if (outleteventresult5 && outleteventresult5[0]) {
                                                                if (obj.bubbles[0].waterPumpMonitoredDevice.onoff.toUpperCase() === "ON") {
                                                                    obj.bubbles[0].waterPumpMonitoredDevice.onofftoggle = "off";
                                                                }
                                                                else {
                                                                    obj.bubbles[0].waterPumpMonitoredDevice.onofftoggle = "on";
                                                                }
                                                                obj.bubbles[0].waterPumpMonitoredDevice.lastevent = outleteventresult5[0];
                                                            }
                                                            db.getMostRecentEvents(userid, deviceid, 20, function (err, mostrecentevents) {
                                                                console.log("mostrecentevents = " + mostrecentevents.length + " events");
                                                                obj.bubbles[0].mostRecentEvents = mostrecentevents;
                                                                // console.log(obj.bubbles[0].mostRecentEvents[0].message);
                                                                cb( obj );
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });

                                    });
                                });
                            });
                        }
                        else {
                            var obj = {};
                            obj.title = "Growbox Status";
                            obj.bubbles = [];
                            obj.bubbles[0] = {
                                airPressure: "",
                                doorStates: {
                                    CABINET: "",
                                    CLOSET: ""
                                },
                                temperatures: {
                                    CABINETAIRTOP: "",
                                    CABINETAIRMIDDLE: ""
                                },
                                airPumpMonitoredDevice: {
                                },
                                humidifierMonitoredDevice: {
                                },
                                waterPumpMonitoredDevice: {
                                },
                                fans: {
                                    INLET: "",
                                    OUTLET: ""
                                },
                                lightStates: {
                                    LEDGROWBLOOMING: "",
                                    LEDGROWVEGETATIVE: "",
                                    INCANDESCENTHEATnull: ""
                                }
                            };
                            obj.bubbles[0].diskfreespace = sprintf("free: %1$uM %2$u%% total: %3$uG", (result.free / 1000000), ((result.free * 100) / result.total), (result.total / 1000000000));
                            cb( obj );
                        }
                    });
                }
                catch (err) {
                    console.log('error ' + err);
                }
            }
        );
        */
    }
