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

describe("device getall", () => {
    console.log("device getall")

    it('device getall', async function () {
        if( good_userid === 0 || good_deviceid === 0 ) {
            x = await test_utils.setupForThisFile()
            good_userid = x.userid
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
                await test_utils.setupForThisFile()
            }
            let b = await device.getAllDevices()
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
});
