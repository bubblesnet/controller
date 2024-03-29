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

