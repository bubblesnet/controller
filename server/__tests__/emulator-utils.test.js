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

describe("emulator-utils", () => {
    console.log("emulator-utils")


    it('emulator-utils', function () {
        let b = emu.getFakeStatus()
        expect(b).not.to.be.undefined
        b = emu.getFakeMeasurement()
        expect(b).not.to.be.undefined
    });
});


