const supertest = require("supertest");
const expect = require('chai').expect;

// This agent refers to PORT where program is running.

const server = supertest.agent("http://localhost:3003",{});

// UNIT test begin
describe("Failed login test",function() {
    it("should fail login", function (done) {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined

            //calling ADD api
            server
                .post('/api/auth/login')
                .send({username: "blah", password: "blah"})
                .expect("Content-type", /json/)
                .expect(401, done);
        }
    )
}
);

/*
    it("should pass login", function (done) {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)

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

 */