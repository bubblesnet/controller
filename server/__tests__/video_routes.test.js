
const expect = require("chai").expect;

const vr = require('../src/api/routes/video_routes')

describe("video_routes video_routes",   () => {
    console.log("video_routes routes")
    it('video_routes routes', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined
        let req = {
            params: {
                id: 90000009,
                deviceid: 70000007,
                filename: "doesntexist"
            }
        }
        let res = {
            json: function (msg) {
                console.log("json " + JSON.stringify(msg));
                expect(msg).not.to.be.undefined;
            },
            end: function () {
                console.log("end ");
            },
            write: function (data) {
                console.log("json " + JSON.stringify(msg));
                expect(data).not.to.be.undefined;
            },
            writeHead: function (code,obj) {
                console.log("json " + code + " " + JSON.stringify(obj));
                expect( code).to.be.equal(404)
                expect(obj).not.to.be.undefined;
            },
        }

        await vr.getImage(req, res, function() {
            console.log("getImage callback")
            expect(false).to.be.true
        });
        console.log("after getImage")
    });
});
