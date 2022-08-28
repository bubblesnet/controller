
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

const expect = require("chai").expect;

const emr = require('../src/api/routes/edgemeasurement_routes')
const bubbles_queue = require('../src/api/models/bubbles_queue')

describe("edgemeasurement routes",   () => {
    console.log("edgemeasurement routes")
    it('edgemeasurement routes', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        let req = {
            body: {},
        }
        let res = {
            json: function (msg) {
                console.log("json " + JSON.stringify(msg));
                expect(msg).not.to.be.undefined;
            },
        }

        await emr.postit(req, res, function() {
            console.log("postit callback")
            expect(false).to.be.true
        });
        await emr.postit(req, res, function() {
            console.log("postit callback")
            expect(false).to.be.true
        });
        console.log("after edge measurement")
        bubbles_queue.deInit(emr.getClient())
    });
});
