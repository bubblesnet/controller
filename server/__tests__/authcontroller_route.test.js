const supertest = require("supertest");
const should = require("chai").should;

// This agent refers to PORT where program is runninng.

const server = supertest.agent("http://localhost:3003",{});

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

    it("should pass login", function (done) {

        //calling ADD api
        server
            .post('/api/auth/login')
            .send({username: "blah", password: "xyz"})
            .expect("Content-type", /json/)
            .expect(999)
            .end(function (err, res) {
                res.status.should.equal(401);
                done();
            });
    });

});