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
            it( 'should return blah', function() {
                console.log("sending ....")
                for( var i = 0; i < 10; i++ ) {
                    bubbles_queue.sendMessage("blah "+i);
                }
                return "blah";
            });
        }
    );

    describe('Subscribe and read all', () => {
            it( 'should return blah', function() {
                console.log("subscribing ....")
                bubbles_queue.subscribeToQueue();
                return "bleh";
            });
        }
    );

});
