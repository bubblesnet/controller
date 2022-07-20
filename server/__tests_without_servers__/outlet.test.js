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
const assert = require('chai').assert;
const test_utils = require('../__tests__/test_utils')
const sensor = require('../src/api/models/sensor')
const bubbles_module = require('../src/api/models/module')
const device = require('../src/api/models/device')
const site = require('../src/api/models/site')
const station = require('../src/api/models/station')
const user = require('../src/api/models/user')
const outlet = require('../src/api/models/outlet')

describe("outlet CRUD", () => {
    console.log("outlet CRUD")

    it('outlet complete simple outlet CRUD', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined

        let us = {username: 'testymctest', firstname: "Testy", lastname: "McTest", email: 'testy@mctest.com', passwordhash: ''}
        let good_user = await user.createUser(us);
        console.log("new user = " + JSON.stringify(good_user))
        expect(good_user.userid >= 0)

        let test_devicetypeid = 0

        let good_site = await site.createSite("test_site_name", good_user.userid)
        expect(good_site.siteid >= 0 ).true

        let good_station = await station.addStation("test_station_name", good_site.siteid)
        expect(good_station.stationid >= 0 ).true

        let dev = {devicename: "test_devicename", devicetypeid: test_devicetypeid, userid: good_user.userid, stationid: good_station.stationid }
        let good_device = await device.createDevice(dev)
        expect(good_device.deviceid >= 0 ).true

        console.log("process.env.NODE_ENV = " + process.env.NODE_ENV)
        let body = {name: "test_outlet", stationid: good_station.stationid, deviceid: good_device.deviceid, index: 0, bcm_pin_number: 10, onoff: false }

        let good_outlet = await outlet.createOutlet(body)
//        {sensorid: results.rows[0].sensorid, message: "A new sensorid has been added :" + results.rows[0].sensorid}
        expect(good_outlet).to.not.be.a('null');
        expect(good_outlet.outletid).greaterThan(0)

         body = {outletid: good_outlet.outletid, name: "test_outlet updated", stationid: good_station.stationid, deviceid: good_device.deviceid, index: 3, bcm_pin_number: 13, onoff: false }
        let x = await outlet.updateOutlet(body)
        expect(x).to.not.be.a('null');
        expect(x.rowcount === 1).true

        x = await outlet.setStateByNameAndStation(body.name, good_station.stationid, true)
        expect(x).to.not.be.a('null');
        expect(x.rowCount === 1).true

        x = await outlet.deleteOutlet(good_outlet.outletid)
        expect(x).to.not.be.a('null');
        expect(x.rowcount === 1).true
    })
})