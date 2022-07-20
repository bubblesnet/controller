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

let created_userid = -1

describe("locals",   () => {
    console.log("read non-existent config")
    const saveFilePath = config.configFilePath
    it('non-existent config',  function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
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
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        try {
            let x = config.getLocals(true);
            expect(true)
        } catch (err) {
            console.log("config read "+err)
            expect(false)
        }
    })
});