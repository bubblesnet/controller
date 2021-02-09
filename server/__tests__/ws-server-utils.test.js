const expect = require('chai').expect;
const wsu = require('../src/ws-server-utils')

describe("ws-server-util",   () => {
    console.log("ws-server-util")
    it('ws-server-util', async function () {
            await wsu.serveUIWebSockets(9667).then( function(x) {
                expect(x).not.to.be.undefined;
                console.log("server x = " + JSON.stringify(x))
                wsu.close()
                console.log("closed")
            })
        });
});


