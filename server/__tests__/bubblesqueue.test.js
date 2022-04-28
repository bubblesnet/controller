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

const bubbles_queue = require("../src/api/models/bubbles_queue")
const assert = require('chai').assert;
const expect = require('chai').expect;

let __testClient
let clientSet = false

function setClient(client) {
    __testClient = client;
    clientSet = true;
}


describe("BubblesQueue", () => {
    describe('Init', () => {
        it('should return blah', async function () {
            console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
            expect( process.env.NODE_ENV ).not.to.be.undefined
            console.log("initing .... ")
            await bubbles_queue.init(setClient);
            clientSet = false;
            bubbles_queue.deInit(__testClient);
            return "blah";
        });
    });

    describe('Send', () => {
        console.log("sending")
        it('should return blah', async function () {
            const sendHeaders = {
                'destination': '/topic/bubbles_ui',
                'content-type': 'text/plain'
            };

            console.log("sending ....")
            console.log("initing .... ")
            await bubbles_queue.init(setClient);
            expect(clientSet).to.be.true
            expect(__testClient).not.to.be.undefined
            for (let i = 0; i < 10; i++) {
                bubbles_queue.sendMessageToQueue(__testClient, JSON.stringify({message: "blah " + i}));
                bubbles_queue.sendMessageToTopic(__testClient, sendHeaders, JSON.stringify({message: "blah " + i}));
            }
            clientSet = false;
            bubbles_queue.deInit(__testClient);
            return "blah";
        });
    });

    describe('Subscribe and read all', () => {
        it('should return blah', async function () {
            console.log("subbing")
            console.log("initing .... ")
            await bubbles_queue.init(setClient);
            console.log("subscribing ....")
            bubbles_queue.sendMessageToQueue(__testClient, JSON.stringify({message: "testing"}))
            bubbles_queue.subscribeToQueue(__testClient, function (body) {
                console.log( "received " + body)
            });
            bubbles_queue.sendMessageToQueue(__testClient, JSON.stringify({message: "testing"}))
            const sendHeaders = {
                'destination': '/topic/bubbles_ui',
                'content-type': 'text/plain'
            };

            bubbles_queue.sendMessageToTopic(__testClient, sendHeaders, JSON.stringify({message: "testing"}))
            bubbles_queue.subscribeToTopic(__testClient, function (body) {
                console.log( "received " + body)
            });

            bubbles_queue.sendMessageToTopic(__testClient, sendHeaders, JSON.stringify({message: "testing"}))
            clientSet = false;
            bubbles_queue.deInit(__testClient);
           return ("bleh");
        });
    });
});
