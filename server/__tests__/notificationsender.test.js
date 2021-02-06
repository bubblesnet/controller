const config = require("../src/config/locals.js");
const expect = require('chai').expect;
const nsender = require("../src/api/services/notificationsender");
const alertcondition = require("../src/api/models/alertcondition");
const assert = require('chai').assert;
const auth = require('../src/api/authcontroller')
const test_utils = require('./test_utils')
const user = require('../src/api/models/user')
const device = require('../src/api/models/device')
const event = require('../src/api/models/event')

let created_userid = -1
let triggered_datetimemillis = 1612640845000;

let good_userid = 0
let good_deviceid = 0
let good_eventid = 0


let bad_alerts = [
 {
    userid: 0,
    deviceid: 0,
    shortmessage: "shortmessage",
    longmessage: "long message",
    triggered_datetimemillis: triggered_datetimemillis,
},

{
    deviceid: 0,
    shortmessage: "shortmessage",
    longmessage: "long message",
    triggered_datetimemillis: triggered_datetimemillis,
    eventid: 0
},
{
    userid: 0,
    shortmessage: "shortmessage",
    longmessage: "long message",
    triggered_datetimemillis: triggered_datetimemillis,
    eventid: 0,
}]

let good_alerts = [
    {
        deviceid: 0,
        userid: 0,
        shortmessage: "shortmessage",
        longmessage: "long message",
        triggered_datetimemillis: triggered_datetimemillis,
        eventid: 0,
    }]

before(async () => {
     x = await test_utils.setupForThisFile()
    good_userid = x.userid;
     good_deviceid = x.deviceid;
     good_eventid = x.eventid;
})


describe("good alertconditions", () => {
    console.log("create alertcondition")

    for( let i in good_alerts ) {
        console.log("good_userid = " + good_userid)
        it(' create good alertcondition', async function () {
            if( good_userid === 0 || good_deviceid === 0 ) {
                await test_utils.setupForThisFile()
            }
            if( good_alerts[i].userid === 0 ) {
                good_alerts[i].userid = good_userid
            }
            if( good_alerts[i].deviceid === 0 ) {
                good_alerts[i].deviceid = good_deviceid
            }
            if( good_alerts[i].eventid === 0 ) {
                good_alerts[i].eventid = good_eventid
            }

            let b = await alertcondition.createAlertCondition(good_alerts[i])
                .then(function (x) {
                    console.log("createAlertCondition = " + JSON.stringify(x))
                    return( true )
                })
                .catch(function (err) {
                    console.log("create good AlertCondition error " + err)
                    return( false )
                });
            expect(b).equals(true)
        });
    }
});



describe("error bad alertconditions",   () => {
    console.log("create no-event alertcondition")

    for( i in bad_alerts ) {
        it('error create no-event alertcondition', async function () {
            if( bad_alerts[i].userid === 0 ) {
                bad_alerts[i].userid = good_userid
            }
            if( bad_alerts[i].deviceid === 0 ) {
                bad_alerts[i].deviceid = good_deviceid
            }
            let b = await alertcondition.createAlertCondition(bad_alerts[i])
                .then(function (x) {
                    console.log("createAlertCondition = " + JSON.stringify(x))
                    return( false )
                })
                .catch(function (err) {
                    console.log("createAlertCondition error " + err)
                    return( true )
                });
            expect(b).equals(true)
        });
    }
});


/*
describe("notificationsender",   () => {
    console.log("Get new notifications")
    it('Get new notifications', async function () {
        await nsender.getNewAlertConditions(function (x) {
            try {
                console.log("getNewAlertConditions = " + JSON.stringify(x))
                expect(x.length >= 0)
            } catch (err) {
                console.log("getNewAlertConditions error " + err)
                expect(false)
            }

        });
    });
});

 */
