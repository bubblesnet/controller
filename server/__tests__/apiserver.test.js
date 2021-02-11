describe("api server",   () => {
    it('start API server', function () {
        const api_server = require('../src/api-server')
        const expect = require('chai').expect;
        console.log("start API server")
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        console.log("closing server")
        api_server.runningServer.close()
    });
});

