
const expect = require("chai").expect;

const emr = require('../src/api/routes/edgemeasurement_routes')
const bubbles_queue = require('../src/api/models/bubbles_queue')

describe("edgemeasurement routes",   () => {
    console.log("edgemeasurement routes")
    it('edgemeasurement routes', async function () {
        let req = {
            body: {},
        }
        let res = {
            json: function (msg) {
                console.log("json " + JSON.stringify(msg));
                expect(msg).not.to.be.undefined;
            },
        }

        await emr.postit(req, res, function() {
            console.log("postit callback")
            expect(false).to.be.true
        });
        console.log("after edge measurement")
        bubbles_queue.deInit(emr.getClient())
    });
});
