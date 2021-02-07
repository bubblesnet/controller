const config = require("../src/config/locals.js");
const expect = require('chai').expect;
const nsender = require("../src/api/services/notificationsender");
const notif = require("../src/api/models/notification");
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
     x = await test_utils.setupForThisFile(true,true)
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
                await test_utils.setupForThisFile(true,true)
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
//                    console.log("createAlertCondition = " + JSON.stringify(x))
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
//                    console.log("createAlertCondition = " + JSON.stringify(x))
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

describe("createNotification",   () => {
    console.log("createNotification")
    it('createNotification',  async function () {

        let millis = Date.now()
        await test_utils.setupForThisFile(true, true)

        let good_notification = {
            notificationid: 0,
            userid: good_userid,
            deviceid: good_deviceid,
            eventid: good_eventid,
            datetimemillis: millis,
            email_required: 0,
            email_recipient:'oncall@blah',
            email_sent: 0,
            sms_required: 0,
            sms_recipient: 'xxx xxx xxxx',
            sms_sent: 0,
            viewedonwebui: 0
        }
        console.log("good_notification = " + JSON.stringify(good_notification))
        notif.createNotification(good_notification, function(err,result) {
            console.log("createNotification err = " + err)
            expect(err).to.be.undefined;
            expect(result).not.to.be.undefined;
            expect(result.rows).not.to.be.undefined;
            expect(result.rows[0]).not.to.be.undefined;
            expect(result.rows[0].notificationid).not.to.be.undefined;
//            console.log("createNotification result = " + JSON.stringify(result))
            good_notification.notificationid = result.rows[0].notificationid
            notif.setEmailNotificationSent(good_notification, function(err, result) {
                expect(err).to.be.undefined;
                expect(result).not.to.be.undefined;
            })
        })
    })})

describe("getNewAlertConditions",   () => {
    console.log("getNewAlertConditions")
    it('getNewAlertConditions', async function () {
        await test_utils.setupForThisFile(true,true)
        await setupEvents(good_userid, good_deviceid);

        let b = await alertcondition.getNewAlertConditions()
            .then( function(result) {
                console.log("getNewAlertConditions = " + JSON.stringify(result))
                expect(result).not.to.be.undefined
            }
            )
            .catch( function(err) {
                console.log("getNewAlertConditions error " + err)
                expect(err).to.be.undefined
            })
    })
   });

describe("notif getNewAlertConditions",   () => {
    console.log("notif getNewAlertConditions")
    it('notif getNewAlertConditions', async function () {
        await test_utils.setupForThisFile(true,true)
        await setupEvents(good_userid, good_deviceid);

        let b = await nsender.getNewAlertConditions()
            .then( function(result) {
                    console.log("notif getNewAlertConditions = " + JSON.stringify(result))
                    expect(result).not.to.be.undefined
                }
            )
            .catch( function(err) {
                console.log("notif getNewAlertConditions error " + err)
                expect(err).to.be.undefined
            })
    })
});

async function setupEvents( userid, deviceid ) {
    for( let i in event_types ) {
        let v = {
            userid: userid,
            deviceid: deviceid,
            type: event_types[i],
            message: 'test event message',
            datetimemillis: new Date().getTime(),
            subeventdatetimemillis: 0,
            floatvalue: 0.0,
            intvalue: i,
            stringvalue: "blah",
            textvalue: "",
            rawjson: {},
            time: 0,
            filename: 'testfile.json'
        };

        x = await event.createEvent(v)
    }
}


let event_types = [
    "SYSTEM_START",
    "ANDROIDEXCEPTION",
    "WIFIFAIL",
    "WIFICONNECT",
    "POWERON",
    "POWEROFF",
    "GERMINATION",
    "COTYLEDON",
    "FIRSTLEAF",
    "WATERLEAK",
    "DOOR_OPEN",
    "DOOR_CLOSE",
    "CABINETMOVEMENT",
    "POTENTIALHACK",
    "WATERADDED",
    "RESERVOIRCHANGED",
    "PHADDED",
    "NUTESADDED",
    "WATER_LEVEL_LOW" ];
