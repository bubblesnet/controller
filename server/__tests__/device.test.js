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
        let b = await device.findAllByUserid()
            .then(function (x) {
                console.log("findAllByUserid = " + JSON.stringify(x))
                expect(false).to.be.true
            })
            .catch(function (err) {
                console.log("findAllByUserid " + err)
                expect (err).not.to.be.undefined
            });
    });



    it('device get by userid', async function () {
        if( good_userid === 0 || good_deviceid === 0 ) {
            let x = await test_utils.setupForThisFile(true,true)
            good_userid = x.userid
            good_deviceid = x.deviceid
            good_eventid = x.eventid
        }
        let b = await device.findAllByUserid(good_userid)
            .then(function (x) {
                console.log("getAllDevices = " + JSON.stringify(x))
                return( x.length > 0 )
            })
            .catch(function (err) {
                console.log("getAllDevices " + err)
                return( false )
            });
        expect(b).equals(true)
    });

    it('device getall', async function () {
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
        if( good_userid === 0 || good_deviceid === 0 || good_deviceid === 0) {
            x = await test_utils.setupForThisFile(true,true)
            good_userid = x.userid
            good_deviceid = x.deviceid
            good_eventid = x.eventid
        }
        let z = {devicename: "updated", devicetypeid: 0, deviceid: good_deviceid}

        let b = await device.updateDevice(z)
            .then(function (x) {
                console.log("updateDevice = " + JSON.stringify(x))
                return( x.deviceid === good_deviceid )
            })
            .catch(function (err) {
                console.log("updateDevice " + err)
                return( false )
            });
        expect(b).equals(true)
    });

    it('update device fail', async function () {
        if( good_userid === 0 || good_deviceid === 0 || good_deviceid === 0) {
            x = await test_utils.setupForThisFile(true,true)
            good_userid = x.userid
            good_deviceid = x.deviceid
            good_eventid = x.eventid
        }
        let z = {devicename: "updated", devicetypeid: 0, deviceid: 9999}

        let b = await device.updateDevice(z)
            .then(function (x) {
                console.log("updateDevice = " + JSON.stringify(x))
                return( x.rowcount === 0 )
            })
            .catch(function (err) {
                console.log("updateDevice " + err)
                return( true )
            });
        expect(b).equals(true)
    });

    it('device delete fail', async function () {
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

describe("device endpool",  () => {
    console.log("device endpool")
    it('device endpool', function () {
        device.endPool();
    });
});
