var express = require('express');
var locals = require('../../config/locals');
var fs = require('fs');
var db = require('../models/bubbles_db');
const disk = require('diskspace');
var sprintf = require('sprintf-js').sprintf;

/* GET users listing. */
exports.status = function (userid, deviceid, cb) {
        console.log("statusbyuserdevice user: " + userid + " device: " + deviceid);
    }
