
const expect = require("chai").expect;

const ecroutes = require('../src/api/routes/edgecontrol_routes')

describe("edgecontrol_routes routes",   () => {
    console.log("edgecontrol_routes routes")
    it('edgecontrol_routes routes', async function () {
        let req = {
            params: {
                userid: 90000009,
                deviceid: 70000007,
                outletname: 'heater',
                onoff: "ON"
            }
        }
        let res = {
            json: function (msg) {
                console.log("json " + JSON.stringify(msg));
                expect(msg).to.be.undefined;
            },
        }

        await ecroutes.getDeviceOutlets(req, res, function() {
            expect(false).to.be.true
        });
    });
});
