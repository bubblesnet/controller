
const expect = require("chai").expect;

const hcroutes = require('../src/api/routes/health_check_routes')

describe("health_check_routes routes",   () => {
    console.log("health_check_routes routes")
    it('health_check_routes routes', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
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

        await hcroutes.getStatus(req, res, function() {
            expect(false).to.be.true
        });
    });
});
