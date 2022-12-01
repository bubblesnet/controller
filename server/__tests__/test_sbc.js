process.env.ICEBREAKER_DB = "icebreaker_dev"

const sbc_model = require("../src/sbc_model")
const expect = require('chai').expect;


describe("Testing sbc_model", () => {
    it('Testing sbc_model', () => {
        return sbc_model.getSbcs().then(data => {
            sbc_model.endPool()
            expect(data.length > 0).to.eq(true);
        });
    });
});