process.env.ICEBREAKER_DB = "icebreaker_dev"

const devicestatus_model = require("../src/devicestatus_model")
const expect = require('chai').expect;


describe("Testing devicestatus_model", () => {
    it('Testing devicestatus_model', async () => {
        let data = await devicestatus_model.getDeviceStatus()
        devicestatus_model.endPool()
        expect(data.length).gt(0);
        });
    });