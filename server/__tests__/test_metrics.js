process.env.ICEBREAKER_DB = "icebreaker_dev"

const metrics_model = require("../src/api/models/icebreaker/metrics_model")


describe("Testing metrics get ALL", () => {
    test('Testing metrics get ALL', () => {
        return metrics_model.getAllMetrics().then(data => {
            metrics_model.endPool()
            expect(data.length).toBe(3);
        });
    });
});