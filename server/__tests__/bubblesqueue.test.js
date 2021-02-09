const bubbles_queue = require("../src/api/models/bubbles_queue")
const assert = require('chai').assert;

let __testClient
let clientSet = false

function setClient(client) {
    __testClient = client;
    clientSet = true;
}


describe("BubblesQueue", () => {
    describe('Init', () => {
        it('should return blah', async function () {
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
            console.log("sending ....")
            console.log("initing .... ")
            await bubbles_queue.init(setClient);
            expect(clientSet).to.be.true
            expect(__testClient).not.to.be.undefined
            for (let i = 0; i < 10; i++) {
                bubbles_queue.sendMessageToQueue(__testClient, JSON.stringify({message: "blah " + i}));
                bubbles_queue.sendMessageToTopic(__testClient, JSON.stringify({message: "blah " + i}));
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
            bubbles_queue.sendMessageToTopic(__testClient, JSON.stringify({message: "testing"}))
            bubbles_queue.subscribeToTopic(__testClient, function (body) {
                console.log( "received " + body)
            });
            bubbles_queue.sendMessageToTopic(__testClient, JSON.stringify({message: "testing"}))
            clientSet = false;
            bubbles_queue.deInit(__testClient);
           return ("bleh");
        });
    });
});
