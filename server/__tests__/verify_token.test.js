const config = require("../src/config/locals.js");
const expect = require('chai').expect;
const user = require("../src/api/models/user");
const assert = require('chai').assert;
const auth = require('../src/api/authcontroller')
const vt = require('../src/api/services/verify_token')

let created_userid = -1

describe("verify token ERROR",   () => {
    console.log("verify token ERROR")
    it('verify token error', function () {
        let req = {
            headers: [],
        }
        req.headers['x-access-token'] = "BLAHALALAL"
        let res = {
            status: function (code) {
                console.log("status code " + code)
                expect(code === 500)
                return ( {
                    send: function (message) { console.log("res.send msg = " + JSON.stringify(message)); return({})}
                })
            },
        }

        vt.verify_token(req, res, function() {
            console.log("verify_token callback")
            expect(false).to.be.true
        });
        console.log("after verify_token")
    });
});
