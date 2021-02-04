const config = require("../src/config/locals.js");
const expect = require('chai').expect;
const user = require("../src/api/models/user");
const assert = require('chai').assert;
const auth = require('../src/api/authcontroller')

let created_userid = -1

describe("locals",   () => {
    console.log("read non-existent config")
    const saveFilePath = config.configFilePath
    it('non-existent config',  function () {
        try {
            let erroredout = false;
            try {
                config.reloadLocals( "lksdjflasdjlfkjsldfjasdf");
                console.log("after readlocals????")
            } catch(err) {
                console.log("config read err "+err)
                erroredout = true
            }
            expect(erroredout).equals(true)
         } finally {
            config.configFilePath = saveFilePath    // reset it so we don't screw up following tests
        }
    })
});

describe("locals",   () => {
    console.log("read good config")
    it('good config',  function () {
        try {
            let x = config.getLocals();
            expect(true)
        } catch (err) {
            console.log("config read "+err)
            expect(false)
        }
    })
});