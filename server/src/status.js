var express = require('express');
var fs = require('fs');
var db = require('../routes/db');
const disk = require('diskspace');
var sprintf = require('sprintf-js').sprintf;

/* GET users listing. */
exports.status = function (userid, deviceid, cb) {
        console.log("statusbyuserdevice user: " + userid + " device: " + deviceid);

    }
