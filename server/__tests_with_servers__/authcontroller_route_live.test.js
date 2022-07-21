/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const supertest = require("supertest");
const expect = require('chai').expect;

// This agent refers to PORT where program is running.

let api_server_port = 0;
let websocket_server_port = 0;

switch( process.env.NODE_ENV ) {
    case "development":
        api_server_port = 3003;
        websocket_server_port = 8001;
        break;
    case "test":
        api_server_port = 3002;
        websocket_server_port = 8002;
        break;
    case "production":
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
    const server = supertest.agent("http://192.168.23.237:"+api_server_port+"",{});
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