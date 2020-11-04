process.env.ICEBREAKER_DB = "icebreaker_dev"

const sbc_model = require("../src/sbc_model")


describe("Testing sbc_model", () => {
    test('Testing sbc_model', () => {
        return sbc_model.getSbcs().then(data => {
            sbc_model.endPool()
            expect(data.length > 0).toBe(true);
        });
    });
});