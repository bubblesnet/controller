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
const emu = require('../src/emulator-util')
const bubbles_queue = require("../src/api/models/bubbles_queue")

let __feederClient

function setClient(client) {
    __feederClient = client;
}

describe("emulator-util",   () => {
    console.log("fake measurements and status")
    it('fake measurement', function () {
        for (let i = 0; i < 100; i++) {
            let x = emu.getFakeMeasurement()
            expect(x.measurement_type)
            expect(x.sensor_name)
            expect(x.sensor_name)
            expect(x.measurement_name)
            expect(x.value)
            expect(x.units)

            let s = emu.getFakeStatus()
            expect(s.status.humidity_internal);
            expect(s.status.temp_air_middle_direction)

            expect(s.status.temp_air_top);
            expect(s.status.temp_air_middle);
            expect(s.status.temp_air_bottom);

        }
    });
});

describe("emulator-utils", () => {
    console.log("emulator-utils")

    it('emulator-utils', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        let b = emu.getFakeStatus()
        expect(b).not.to.be.undefined
        await bubbles_queue.init(setClient)
        b = emu.sendFakeMeasurement(true)
        expect(b).not.to.be.undefined
        b = emu.sendFakeMeasurementToTopic(__feederClient)
        expect(b).not.to.be.undefined
        b = emu.sendFakeStatusToQueue(__feederClient)
        expect(b).not.to.be.undefined
        b = emu.sendFakeStatusToTopic(__feederClient)
        expect(b).not.to.be.undefined
    });
});


