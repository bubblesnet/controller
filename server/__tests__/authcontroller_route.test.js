
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

const au = require('../src/api/routes/authcontroller_routes')
const expect = require('chai').expect
const user = require('../src/api/models/user')
const request = require("supertest");

describe("Find User",function() {
    it("should fail login", async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        const reqfail1 = {
            body: {
                username: 'blahblah'
            }
        }
        const res = {
            status: function (code) {
                console.log("should fail login status code " + code)
                expect(code ).to.equal(401)
                return ({
                    json: function(message) {
                        return({})
                    },
                    send: function (message) {
                        console.log("fail res.send msg = " + JSON.stringify(message));
                        return ({})
                    }
                })
            }
        }
        console.log("await findUser")
        await au.findUser(reqfail1, res)
        console.log("after await findUser")
    });
});
/*
describe("Find User good",function() {
    it("should pass login", async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        const autr_username = 'autr_' + Date.now()
        const plaintext_password = 'xyz'
        const req_success = {
            body: {
                username: autr_username,
                password: plaintext_password
            }
        }

        const res_success = {
            status: function (code) {
                console.log("should pass login status code " + code)
                expect(code).to.equal(200)
                return ({
                    json: function(message) {
                        return({})
                    },
                    send: function (message) {
                        console.log("success res.send msg = " + JSON.stringify(message));
                        return ({})
                    }
                })
            }
        }

        let x = await user.createUser({
            username: autr_username,
            firstname: 'John',
            lastname: 'Rodley',
            email: 'blah@blah.com',
            password: 'xyz',
            passwordhash: ''
        });
        req_success.body.userid = x.userid
        console.log("new filled user = " + JSON.stringify(x))
        expect(x.userid > 0).to.be.true
        z = await user.setPassword(x.userid, plaintext_password);
        await au.findUser(req_success, res_success)
    })
});
*/