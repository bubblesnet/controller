
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

const ecroutes = require('../src/api/routes/edgecontrol_routes')

let functions = []

let client = {
    on: function (code,cb) {
        console.log("on " + code)
        functions.push({code: code, cb: cb})
    },
    address: function(){ return({address:"testaddress",port:"testport"})},
    close: function() { console.log("client.close")}
}

describe("edgecontrol_routes routes",   () => {
    console.log("edgecontrol_routes routes")
    it('edgecontrol_routes routes', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        let req = {
            params: {
                userid: 90000009,
                deviceid: 70000007,
                outletname: 'heater',
                onoff: "ON"
            }
        }
        let res = {
            json: function (msg) {
                console.log("json " + JSON.stringify(msg));
                expect(msg).not.to.be.undefined;
            },
            setHeader: function(header,value) {
                console.log("Setting header " + header + " to value "+value)
            }
        }
        let remote = {address:"testaddress",port:"testport"}

        await ecroutes.getDeviceOutlets(client, req, res, function() {
            expect(false).to.be.true
        });
        for( let i = 0; i < functions.length; i++ ) {
            switch( functions[i].code ) {
                case 'listening':
                    functions[i].cb()
                    break;
                case 'message':
                    let message = {message:"AHHHHH!"}
                    functions[i].cb(JSON.stringify(message), remote);
                    break;
                case 'error':
                    let err = "errORRRRRRRR"
                    functions[i].cb(err)
                    break;
            }
        }
    });
});
