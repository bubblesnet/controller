const bubbles_queue = require("../src/api/models/bubbles_queue")
const assert = require('assert');

let __testClient
let clientSet = false

function setClient(client) {
    __testClient = client;
    clientSet = true;
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

describe("BubblesQueue", () => {
    describe('Init', () => {
            it('should return blah', async function () {
                let count = 1
                while( clientSet === false  && count < 20) {
                    console.log("initing .... " + count)
                    await bubbles_queue.init(setClient);
                    if( !clientSet ) {
                        count++;
                        await sleep(2000)
                    }
                }
                clientSet = false;
                bubbles_queue.deInit(__testClient);
                return "blah";
            });
        });

    describe('Send', () => {
        console.log("sending")
        it('should return blah', async function () {
            console.log("sending ....")
            let count = 1
            while( clientSet === false  && count < 20) {
                console.log("initing .... " + count)
                await bubbles_queue.init(setClient);
                if( !clientSet ) {
                    count++;
                    await sleep(2000)
                }
            }
            for (var i = 0; i < 10; i++) {
                bubbles_queue.sendMessageToQueue(__testClient, "blah " + i);
                bubbles_queue.sendMessageToTopic(__testClient, "blah " + i);
            }
            clientSet = false;
            bubbles_queue.deInit(__testClient);
            return "blah";
        });
    });

    describe('Subscribe and read all', () => {
        it('should return blah', async function () {
            console.log("subbing")
            let count = 1
            while( clientSet === false && count < 20) {
                console.log("initing .... " + count)
                await bubbles_queue.init(setClient);
                if( !clientSet ) {
                    count++;
                    await sleep(2000)
                }
            }
            console.log("subscribing ....")
            bubbles_queue.sendMessageToQueue(__testClient, "testing")
            bubbles_queue.subscribeToQueue(__testClient, function (body) {
                console.log( "received " + body)
            });
            bubbles_queue.sendMessageToQueue(__testClient, "testing")
            bubbles_queue.sendMessageToTopic(__testClient, "testing")
            bubbles_queue.subscribeToTopic(__testClient, function (body) {
                console.log( "received " + body)
            });
            bubbles_queue.sendMessageToTopic(__testClient, "testing")
            clientSet = false;
            bubbles_queue.deInit(__testClient);
           return ("bleh");
        });
    });

});
