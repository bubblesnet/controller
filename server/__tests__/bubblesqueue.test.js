const bubbles_queue = require("../src/api/models/bubbles_queue")
const assert = require('assert');

let __testClient

function setClient(client) {
    __testClient = client;
}

describe("BubblesQueue", () => {
    describe('Init', () => {
            it('should return blah', async function () {
                console.log("initing ....")
                await bubbles_queue.init(setClient);
                __testClient.disconnect();
                return "blah";
            });
        });

    describe('Send', () => {
        console.log("sending")
        it('should return blah', async function () {
            console.log("sending ....")
            await bubbles_queue.init(setClient)
            for (var i = 0; i < 10; i++) {
                bubbles_queue.sendMessageToQueue(__testClient, "blah " + i);
                bubbles_queue.sendMessageToTopic(__testClient, "blah " + i);
            }
            __testClient.disconnect();
            return "blah";
        });
    });

    describe('Subscribe and read all', () => {
        it('should return blah', async function () {
            console.log("subbing")
            await bubbles_queue.init(setClient)
            console.log("subscribing ....")
            bubbles_queue.sendMessageToQueue(__testClient, "testing")
            bubbles_queue.subscribeToQueue(__testClient, function (body) {
                console.log( "received " + body)
            });
            bubbles_queue.sendMessageToTopic(__testClient, "testing")
            bubbles_queue.subscribeToTopic(__testClient, function (body) {
                console.log( "received " + body)
            });
            __testClient.disconnect();
           return ("bleh");
        });
    });

});
