const config = require("../src/config/locals.js");
const expect = require('chai').expect;
const assert = require('chai').assert;
const test_utils = require('../__tests__/test_utils')
const site = require('../src/api/models/site')
const user = require('../src/api/models/user')
const station = require('../src/api/models/station')
const device = require('../src/api/models/device')
const bubbles_module = require('../src/api/models/module')

let good_user= {}
let good_site = {}

describe("module CRUD", () => {
    console.log("module CRUD")

    it('module complete CRUD sequence', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined

        let us = {username: 'testymctest', firstname: "Testy", lastname: "McTest", email: 'testy@mctest.com', passwordhash: ''}
        good_user = await user.createUser(us);
        console.log("new user = " + JSON.stringify(good_user))
        expect(good_user.userid >= 0)

        good_site = await site.createSite("test_site_name", good_user.userid)
        expect(good_site.siteid >=0)

        let good_station = await station.addStation("test_station_name", good_site.siteid)
        expect(good_station.stationid >=0)

        let body = {devicename: "test device", stationid: good_station.stationid, devicetypeid: 0, userid: good_user.userid }
        let good_device = await device.createDevice(body)
        expect(good_device.deviceid >=0)

        // body.module_name, body.deviceid, body.container_name, body.module_type, body.i2caddress, body.protocol
        body = {deviceid: good_device.deviceid, module_name: "Test Module", container_name: "sense-go", module_type: "bme444", i2caddress: "0x33", protocol: "i2c" }
        let good_module = await bubbles_module.createModule(body)
        expect( good_module.moduleid >= 0 )
        console.log("Added module id " + good_module.moduleid)
        body.moduleid = good_module.moduleid

        let x = await bubbles_module.updateModule(body)
        expect(x.moduleid === good_module.moduleid)

        x = await bubbles_module.deleteModule(good_module.moduleid)
        expect(x.moduleid === good_module.moduleid)

        x = await device.deleteDevice(good_device.deviceid)
        expect(x.deviceid === good_device.deviceid)

        x = await site.deleteSite(good_site.siteid)
        expect(x.siteid === good_site.siteid).true

    })

})