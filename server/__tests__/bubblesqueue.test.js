const bubbles_queue = require("../src/api/models/bubbles_queue")
const assert = require('assert');


describe("BubblesQueue", () => {
    describe('Init', () => {
        it( 'should return blah', async function() {
            console.log("initing ....")
            await bubbles_queue.init();
            return "blah";
        });
        }
        );
    describe('Send', () => {
            it( 'should return blah', async function() {
                console.log("sending ....")
                bubbles_queue.sendMessage("blah");
                return "blah";
            });
        }
    );
    describe('Subscribe', () => {
            it( 'should return blah', async function() {
                console.log("sending ....")
                bubbles_queue.subscribe();
                bubbles_queue.sendMessage("bleh");
                return "bleh";
            });
        }
    );

});
