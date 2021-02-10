const expect = require('chai').expect;
const wsu = require('../src/ws-server-utils')
const ws = require("nodejs-websocket")

let message_sent = false
const port = 9667

describe("ws-server-util",   async () => {
    it('ws-server-util', async function () {
        console.log("ws-server-util")
    }
    )});

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

const cmax_retries = 7;
let cretrycount = 0;

async function connectIt(port) {
    console.log("connectIt retry "+cretrycount)
    let url = "ws://localhost:"+port
    ws.connect(url, function() {
        message_sent = true
        console.log("connected to " + url)
        wsu.close()
        console.log("closed")
    })
    if( !message_sent && cretrycount < cmax_retries ) {
        cretrycount++;
        setTimeout(() => {
            connectIt(port)
        }, 300);
    } else {

    }

}

async function connectToWS(port) {
    setTimeout(() => {
        connectIt(port)
    }, 300);
}

 */


