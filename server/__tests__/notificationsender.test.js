/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

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
            console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
            expect( process.env.NODE_ENV ).not.to.be.undefined
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
            console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
            expect( process.env.NODE_ENV ).not.to.be.undefined
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
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined

        let millis = Date.now()
        await test_utils.setupForThisFile(true, true)

        let good_notification = {
            notificationid: 0,
            userid: good_userid,
            deviceid: good_deviceid,
            eventid: good_eventid,
            datetimemillis: millis,
            email_required: 1,
            email_recipient:'oncall@blah',
            email_sent: 0,
            sms_required: 1,
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
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        await test_utils.setupForThisFile(true,true)
        await test_utils.createCompleteSetOfAlertableEvents(good_userid, good_deviceid);
/*
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

 */
    })
   });


describe("notif getNewAlertConditions",   () => {
    console.log("notif getNewAlertConditions")
    it('notif getNewAlertConditions', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        await test_utils.setupForThisFile(true,true)
        let events = await test_utils.createCompleteSetOfAlertableEvents(good_userid, good_deviceid);
        for( let i in events ) {
            let alert = {
                eventid: events[i].eventid,
                userid: good_userid,
                deviceid: good_deviceid,
                triggered_datetimemillis: Date.now(),
                shortmessage: "short message " + i,
                longmessage: "long message "+i
            }
            let ac = await alertcondition.createAlertCondition(alert)
            console.log("created alertcondition " + JSON.stringify(ac))
        }

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




