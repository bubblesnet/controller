/** OBSOLETE
 process.env.ICEBREAKER_DB = "icebreaker_dev"

const testqueue_model = require("../src/testqueue_model")
const expect = require('chai').expect;

describe("Testing testqueue_model", () => {
    it('Testing testqueue_model', () => {
        return testqueue_model.getAll(99).then(data => {
            testqueue_model.endPool()
            expect(data.length > 0).to.eq(true);
        });
    });
});
 */