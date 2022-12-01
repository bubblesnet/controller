process.env.ICEBREAKER_DB = "icebreaker_dev"

const metrics_model = require("../src/metrics_model")
const expect = require('chai').expect;

/** OBSOLETE
describe("Testing metrics", () => {
    it('Testing metrics', async () => {
        let data = await metrics_model.getAllMetrics()
        metrics_model.endPool()
        expect(data.length).to.eq(3);
        });
    });
*/