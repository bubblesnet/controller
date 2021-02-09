
process.env.PORT = "9000";

const api_server = require('../src/api-server')
const expect = require('chai').expect;

describe("api server",   () => {
    console.log("start API server")
    it('start API server', function () {
        console.log("closing server")
        api_server.runningServer.close()
    });
});

