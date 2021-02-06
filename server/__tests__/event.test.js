const config = require("../src/config/locals.js");
const expect = require('chai').expect;
const event = require("../src/api/models/event");
const assert = require('chai').assert;
const auth = require('../src/api/authcontroller')

let created_userid = -1

/*
describe("event",   () => {
    console.log("add new event")
    it('Get new notifications', async function () {
        await event.createEvent(e, function (x) {
            try {
                console.log("getNewAlertConditions = " + JSON.stringify(x))
                expect(x.length >= 0)
            } catch (err) {
                console.log("getNewAlertConditions error " + err)
                expect(false)
            }

        });
    });
});

 */
