const expect = require('chai').expect;

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

describe("api server",   () => {
    it('start API server', async function () {
        setTimeout( function() {
            console.log("timed out")
            expect( true ).to.be.false
        }, 10000);
        console.log("starting API server")
        const api_server = require('../src/api-server')
        console.log("waiting for server to be listening")
        await sleep(1000)
 //       expect(api_server.listening).to.be.true
            console.log("process.env.NODE_ENV = " + process.env.NODE_ENV)
            expect(process.env.NODE_ENV).not.to.be.undefined
            console.log("closing server")
            // wait for server to start
            let err = api_server.close()
        expect(err).to.be.undefined
    });
});

