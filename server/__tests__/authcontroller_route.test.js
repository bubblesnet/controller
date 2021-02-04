const supertest = require("supertest");
const should = require("should");

// This agent refers to PORT where program is runninng.

const server = supertest.agent("http://localhost:3003");

// UNIT test begin

describe("Failed login test",function() {

    // #1 should return home page

    it("should fail login", function (done) {

        //calling ADD api
        server
            .post('/api/auth/login')
            .send({username: "blah", password: "blah"})
            .expect("Content-type", /json/)
            .expect(401)
            .end(function (err, res) {
                res.status.should.equal(401);
                done();
            });
    });
});