
process.env.ENV = "CI"

const ee = require('../src/queue-feeder-emulator')
const expect = require('chai').expect;

describe("queue-feeder-emulator",   () => {
    console.log("queue-feeder-emulator")
    it('queue-feeder-emulator', function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        console.log("closing emulator")
    });
});

