
const expect = require("chai").expect;

const cfroutes = require('../src/api/routes/config_routes')

describe("config_routes routes",   () => {
    console.log("config_routes routes")
    it('config_routes routes', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        let req = {
            params: {
                userid: 90000009,
                deviceid: 70000007
            }
        }
        let res = {
            json: function (msg) {
                console.log("json " + JSON.stringify(msg));
                expect(msg).not.to.be.undefined;
            },
        }

        await cfroutes.getContainers(req, res, function() {
            expect(false).to.be.true
        });
        await cfroutes.getDeviceConfig(req, res, function() {
            expect(false).to.be.true
        });
        await cfroutes.getDeviceConfig(req, res, function() {
            expect(false).to.be.true
        });
    });
});
