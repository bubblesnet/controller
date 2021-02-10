
const expect = require("chai").expect;

const hcroutes = require('../src/api/routes/user_routes')

describe("user_routes routes",   () => {
    console.log("user_routes routes")
    it('user_routes routes', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        let req = {
            params: {
                id: 90000009,
            }
        }
        let res = {
            json: function (msg) {
                console.log("json " + JSON.stringify(msg));
                expect(msg).not.to.be.undefined;
            },
        }

        await hcroutes.getUserById(req, res, function() {
            expect(false).to.be.true
        });
        await hcroutes.getUserByName(req, res, function() {
            expect(false).to.be.true
        });
    });
});
