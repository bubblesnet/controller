const supertest = require("supertest");
const expect = require('chai').expect;

// This agent refers to PORT where program is running.

let api_server_port = 0;
let websocket_server_port = 0;

switch( process.env.NODE_ENV ) {
    case "DEV":
        api_server_port = 3003;
        websocket_server_port = 8001;
        break;
    case "TEST":
        api_server_port = 3002;
        websocket_server_port = 8002;
        break;
    case "PRODUCTION":
        api_server_port = 3001;
        websocket_server_port = 8003;
        break;
    case "CI":
        api_server_port = 3004;
        websocket_server_port = 8004;
        break;
}


// not working in CI where no server running
// UNIT test begin
describe("Failed login test",function() {
    const server = supertest.agent("http://192.168.21.237:"+api_server_port+"",{});
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

//

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