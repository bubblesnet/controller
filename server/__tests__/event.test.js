const config = require("../src/config/locals.js");
const expect = require('chai').expect;
const event = require("../src/api/models/event");
const assert = require('chai').assert;
const auth = require('../src/api/authcontroller')
const test_utils = require('./test_utils')


let good_userid = 0
let good_deviceid = 0


before(async () => {
    x = await test_utils.setupForThisFile(true,false)
    good_userid = x.userid;
    good_deviceid = x.deviceid;
})

describe("event",   () => {
    it('Create good event', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        console.log("add good event")
        const good_event = {
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
        }

        await event.createEvent(good_event, function (x) {
            try {
                console.log("create event = " + JSON.stringify(x))
                expect(x.length >= 0)
            } catch (err) {
                console.log("createEvent error " + err)
                expect(false)
            }

        });
    });

    it('Create bad events', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
       console.log("add bad event")
        const badevents = [
            {
//            userid: good_userid,
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
            },
            {
                userid: good_userid,
//                deviceid: good_deviceid,
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
            },
        ]

        for (let i = 0; i < badevents.length; i++) {
            await event.createEvent(badevents[i])
                .then(function (x) {
                    console.log("bad event = " + JSON.stringify(x))
                    expect(x.length >= 0)
                })
                .catch(function (err) {
                    console.log("bad error " + err)
                    expect(true)

                })
        }
    })
})

