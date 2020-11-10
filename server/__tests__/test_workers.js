process.env.ICEBREAKER_DB = "icebreaker_dev"

const devicestatus_model = require("../src/api/models/icebreaker/devicestatus_model")


describe("Testing devicestatus_model", () => {
    test('Testing devicestatus_model', () => {
        return devicestatus_model.getDeviceStatus().then(data => {
            devicestatus_model.endPool()
            expect(data.length > 0).toBe(true);
        });
    });
});