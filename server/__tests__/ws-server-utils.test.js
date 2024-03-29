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

const expect = require('chai').expect;
const wsu = require('../src/ws-server-utils')
const ws = require("nodejs-websocket")

let message_sent = false
const port = 9667

describe("ws-server-util subscribe to ws",   async () => {
    it('ws-server-util run ws server', async function () {
            console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
            expect( process.env.NODE_ENV ).not.to.be.undefined
            console.log("ws-server-util run ws server")
            await wsu.runWebSocketServer(port)
//           await connectToWebsocketServer(port)
            await wsu.close()
        }
    )
    it('ws-server-util subscribe to topic', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
            console.log("ws-server-util subscribe to topic")
            await wsu.subscribeToTopic()
            await wsu.close()
        }
    );

});

const cmax_retries = 7;
let cretrycount = 0;

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function connectToWebsocketServer(port) {
    console.log("connectIt retry "+cretrycount)
    let url = "ws://localhost:"+port
    while( !message_sent && cretrycount < cmax_retries ) {
        try {
            console.log("calling ws.connect")
            ws.connect(url, function () {
                message_sent = true
                console.log("connected to " + url)
                wsu.close()
                console.log("closed")
                cretrycount++;
                return (message_sent)
            })
        } catch(error) {
            console.error('connectToWebsocketServer error '+error)
        }
        await sleep(2000)
    }
    return( message_sent )
}

/* DOESNT WORK
describe("ws-server-util",   async () => {
    it('ws-server-util', async function () {
        console.log("ws-server-util")
        connectToWS(port)
        await wsu.serveUIWebSockets(port).then( function(x) {
                expect(x).not.to.be.undefined;
                console.log("server x = " + JSON.stringify(x))
            })
        console.log("waiting for test to end")
        let b = await waitForTestToEnd();
        expect(b).to.be.true
        });
});

const max_retries = 5
let retrycount = 0;

async function waitForTestToEnd() {
    return new Promise(function(resolve, reject) {
        console.log("waitForTestToEnd retry "+retrycount  )
        if( !message_sent && retrycount < max_retries ) {
            retrycount++;
            setTimeout(() => {
                waitForTestToEnd()
            }, 500);
            return;
        } else {
            resolve(true)
        }
        reject(false)
    });
}



async function connectToWS(port) {
    setTimeout(() => {
        connectIt(port)
    }, 300);
}

 */


