const config = require("../src/config/locals.js");
const expect = require('chai').expect;
const nsender = require("../src/api/services/notificationsender");
const alertcondition = require("../src/api/models/alertcondition");
const assert = require('chai').assert;
const auth = require('../src/api/authcontroller')

const user = require('../src/api/models/user')
const device = require('../src/api/models/device')
const event = require('../src/api/models/event')

let created_userid = -1
let triggered_datetimemillis = 1612640845000;
let good_userid = 0
let good_deviceid = 0
let good_eventid = 0


async function setupForThisFile(create_device,create_event) {
    console.log("setupForThisFile")
    let u = {
        firstname: "test",
        lastname: "lasttest",
        email: "blah@blah.com",
        username: "test_" + triggered_datetimemillis,
        passwordhash: "blah"
    }
    let x = await user.createUser(u)
    good_userid = x.userid
    console.log("userid = " + good_userid)
    assert(good_userid > 0)
    let s = {
        userid: good_userid,
        useemailforsecurity: 1,
        usesmsforsecurity: 1,
        useemailforplantprogress: 1,
        usesmsforplantprogress: 1,
        useemailformaintenancerequired: 1,
        usesmsformaintenancerequired: 1,
        useemailforinformation: 1,
        usesmsforinformation: 1,
    }
    let us = await user.createSettings(s);
    assert(us.usersettingsid > 0 );
    user.getUserSettings(good_userid, function(err, result) {
        expect(err).to.be.undefined;
        expect(result).not.to.be.undefined;
        expect(result.rows).not.to.be.undefined;
    })

    let d = {
        userid: x.userid,
        devicetypeid: 0,
        devicename: "test" + triggered_datetimemillis
    }
    if( create_device ) {
        x = await device.createDevice(d)
        good_deviceid = x.deviceid
        assert(good_deviceid > 0)
        console.log("deviceid = " + good_deviceid)

        if( create_event) {
            let v = {
                userid: good_userid,
                deviceid: good_deviceid,
                type: 'testtype',
                message: 'test message',
                datetimemillis: 0,
                subeventdatetimemillis: 0,
                floatvalue: 0.0,
                intvalue: 0,
                stringvalue: "blah",
                textvalue: "",
                rawjson: {},
                time: 0,
                filename: 'testfile.json'
            };

            x = await event.createEvent(v)
            good_eventid = x.eventid
            assert(good_eventid > 0)
            console.log("eventid = " + good_eventid)
        }
    }
    z = { userid: good_userid, deviceid: good_deviceid, eventid: good_eventid}
    return(z)

}

module.exports = {
    setupForThisFile,
    good_userid: good_userid,
    good_deviceid: good_deviceid,
    good_eventid: good_eventid
}
