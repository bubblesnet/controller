/**
 process.env.ICEBREAKER_DB = "icebreaker_dev"

const testrun_model = require("../src/testrun_model")
const expect = require('chai').expect;

describe("Testing metrics", () => {
    it('Testing metrics', async () => {
        let data = await testrun_model.getTestRuns()
        testrun_model.endPool()
        expect(data.length > 0).to.eq(true);
        });
    });
 */