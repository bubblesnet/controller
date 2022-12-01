process.env.ICEBREAKER_DB = "icebreaker_dev"

const metrics_model = require("../src/metrics_model")


describe("Testing metrics", () => {
    test('Testing metrics', () => {
        return metrics_model.getAllMetrics().then(data => {
            metrics_model.endPool()
            expect(data.length == 3);
        });
    });
});