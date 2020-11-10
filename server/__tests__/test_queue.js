process.env.ICEBREAKER_DB = "icebreaker_dev"

const testqueue_model = require("../src/api/models/icebreaker/testqueue_model")


describe("Testing testqueue_model", () => {
    test('Testing testqueue_model', () => {
        return testqueue_model.getAll(99).then(data => {
            testqueue_model.endPool()
            expect(data.length > 0).toBe(true);
        });
    });
});