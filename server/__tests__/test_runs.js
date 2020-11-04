process.env.ICEBREAKER_DB = "icebreaker_dev"

const testrun_model = require("../src/testrun_model")


describe("Testing metrics", () => {
    test('Testing metrics', () => {
        return testrun_model.getTestRuns().then(data => {
            testrun_model.endPool()
            expect(data.length > 0).toBe(true);
        });
    });
});