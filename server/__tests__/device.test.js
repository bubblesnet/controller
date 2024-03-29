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
const alertcondition = require("../src/api/models/alertcondition");
const assert = require('chai').assert;
const auth = require('../src/api/authcontroller')
const test_utils = require('./test_utils')
const user = require('../src/api/models/user')
const device = require('../src/api/models/device')
const event = require('../src/api/models/event')

let good_userid = 0
let good_deviceid = 0
let good_eventid = 0

describe("device GETTERS", () => {
    console.log("device getall")


    it('device findAllByUserid error', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
       let b = await device.findAllByUserid({xxx:98274})
            .then(function (x) {
                console.log("findAllByUserid = " + JSON.stringify(x))
                expect(false).to.be.true
            })
            .catch(function (err) {
                console.log("findAllByUserid " + err)
                expect (err).not.to.be.undefined
            });
    });

    it('error device get by userid', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
       let b = await device.findAllByUserid()
            .then(function (x) {
                console.log("getAllDevices = " + JSON.stringify(x))
                expect( x ).to.be.undefined
            })
            .catch(function (err) {
                console.log("error device get by userid " + err)
                expect( err ).not.to.be.undefined
            });
    });


    it('device get by userid', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        if( good_userid === 0 || good_deviceid === 0 ) {
            let x = await test_utils.setupForThisFile(true,true)
            good_userid = x.userid
            good_deviceid = x.deviceid
            good_eventid = x.eventid
        }
        let b = await device.findAllByUserid(good_userid)
            .then(function (x) {
                console.log("getAllDevices = " + JSON.stringify(x.rows))
                expect( x ).not.to.be.undefined
            })
            .catch(function (err) {
                console.log("getAllDevices " + err)
                expect( err ).to.be.undefined
            });
    });

    it('device getall', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
            if( good_userid === 0 || good_deviceid === 0 ) {
                let x = await test_utils.setupForThisFile(true,true)
                good_userid = x.userid
                good_deviceid = x.deviceid
                good_eventid = x.eventid
            }
            let b = await device.getAllDevices()
                .then(function (x) {
 //                   console.log("getAllDevices = " + JSON.stringify(x))
                    return( x.length > 0 )
                })
                .catch(function (err) {
                    console.log("getAllDevices " + err)
                    return( false )
                });
            expect(b).equals(true)
        });

    it('update device success', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        if( good_userid === 0 || good_deviceid === 0 || good_deviceid === 0) {
            x = await test_utils.setupForThisFile(true,true)
            good_userid = x.userid
            good_deviceid = x.deviceid
            good_eventid = x.eventid
        }
        let z = {devicename: "updated", devicetypeid: 0, deviceid: good_deviceid}

        let j = await device.setJustSeen(good_deviceid)
            .then(function (x) {
                console.log("setJustSeen = " + JSON.stringify(x))
                expect(x).not.to.be.undefined
                expect(x.rowCount).eq(1)
            })
            .catch(function (err) {
                console.log("setJustSeen " + err)
                expect(err).not.to.be.undefined
            });

        let b = await device.updateDevice(z)
            .then(function (x) {
                console.log("updateDevice = " + JSON.stringify(x))
                expect(x).not.to.be.undefined
                expect(x.rowcount).eq(1)
            })
            .catch(function (err) {
                console.log("updateDevice " + err)
                expect(err).not.to.be.undefined
            });
    });

    it('update device fail', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        let b = await device.updateDevice()
            .then(function (x) {
                console.log("updateDevice = " + JSON.stringify(x))
                expect( x).to.be.undefined
            })
            .catch(function (err) {
                console.log("updateDevice " + err)
                expect(err).not.to.be.undefined
            });
    });

    it('device create fail', async function () {
        //       if( good_userid === 0 || good_deviceid === 0 || good_deviceid === 0) {
 //       let x = await test_utils.setupForThisFile(true,true) // Always make new device for the good delete so attached events don't bork it
        //       }
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        let b = await device.createDevice({})
            .then(function (x) {
                console.log("createDevice = " + JSON.stringify(x))
                expect(x).to.be.undefined
            })
            .catch(function (err) {
                console.log("deleteDevice " + err)
                expect(err).not.to.be.undefined
            });
    });

    it('device delete fail', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
 //       if( good_userid === 0 || good_deviceid === 0 || good_deviceid === 0) {
            let x = await test_utils.setupForThisFile(true,true) // Always make new device for the good delete so attached events don't bork it
            good_userid = x.userid
            good_deviceid = x.deviceid
            good_eventid = x.eventid
 //       }
        let b = await device.deleteDevice(good_deviceid)
            .then(function (x) {
                console.log("deleteDevice = " + JSON.stringify(x))
                return( false )
            })
            .catch(function (err) {
                console.log("deleteDevice " + err)
                return( true )
            });
        expect(b).equals(true)
    });

    it('device delete succeed', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        //       if( good_userid === 0 || good_deviceid === 0 || good_deviceid === 0) {
        let x = await test_utils.setupForThisFile(true,false) // Always make new device for the good delete so attached events don't bork it
        good_userid = x.userid
        good_deviceid = x.deviceid
        good_eventid = x.eventid
        //       }
        let b = await device.deleteDevice(good_deviceid)
            .then(function (x) {
                console.log("deleteDevice = " + JSON.stringify(x))
                return( x.rowcount === 1 )
            })
            .catch(function (err) {
                console.log("deleteDevice " + err)
                return( false )
            });
        expect(b).equals(true)
    });

});
/*
describe("device endpool",  () => {
    console.log("device endpool")
    it('device endpool', function () {
        device.endPool();
    });
});
 */
