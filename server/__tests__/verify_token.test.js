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
const user = require("../src/api/models/user");
const assert = require('chai').assert;
const auth = require('../src/api/authcontroller')
const vt = require('../src/api/services/verify_token')

let created_userid = -1

describe("verify bad token ERROR",   () => {
    console.log("verify token ERROR")
    it('verify token error', function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
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

describe("verify no token ERROR",   () => {
    console.log("verify no token ERROR")
    it('verify no token error', function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        let req = {
            headers: [],
        }
//        req.headers['x-access-token'] = "BLAHALALAL"
        let res = {
            status: function (code) {
                console.log("status code " + code)
                expect(code === 403)
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

/*
describe("verify good token ",   () => {
    console.log("verify good token")
    it('verify good token', function () {
        let req = {
            headers: [],
        }
        req.headers['x-access-token'] = "BLAHALALAL"
        let res = {
            status: function (code) {
                console.log("status code " + code)
                expect(false).to.be.true
                return ( {
                    send: function (message) { console.log("res.send msg = " + JSON.stringify(message)); return({})}
                })
            },
        }

        vt.verify_token(req, res, function() {
            console.log("verify_token callback")
            expect(true).to.be.true
        });
        console.log("after verify_token")
    });
});

 */


