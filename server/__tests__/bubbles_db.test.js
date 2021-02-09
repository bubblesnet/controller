const config = require("../src/config/locals.js");
const expect = require('chai').expect;
const nsender = require("../src/api/services/notificationsender");
const dbd = require("../src/api/models/bubbles_db");
const assert = require('chai').assert;
const auth = require('../src/api/authcontroller')
const test_utils = require('./test_utils')
const user = require('../src/api/models/user')
const device = require('../src/api/models/device')
const event = require('../src/api/models/event')


describe("getLastKnownIPAddress", () => {
    console.log("getLastKnownIPAddress");
    let userid = 90000009;
    let deviceid = 70000007;

    it('getLastKnownIPAddress', async function () {
        await dbd.getLastKnownIPAddress(userid, deviceid, function () {
            console.log("getlastknownip callback")
        })
    });
});

