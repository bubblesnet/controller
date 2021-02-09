
const au = require('../src/api/routes/authcontroller_routes')
const expect = require('chai').expect
const user = require('../src/api/models/user')

describe("Find User",function() {
    it("should fail login", async function () {
        const reqfail1 = {
            body: {
                username: 'blahblah'
            }
        }
        const res = {
            status: function (code) {
                console.log("status code " + code)
                expect(code === 401).to.be.true
                return ({
                    send: function (message) {
                        console.log("fail res.send msg = " + JSON.stringify(message));
                        return ({})
                    }
                })
            }
        }

        await au.findUser(reqfail1, res)
    });
});

describe("Find User good",function() {
    it("should pass login", async function () {
        const autr_username = 'autr_' + Date.now()
        const plaintext_password = 'xyz'
        const req_success = {
            body: {
                username: autr_username,
                password: plaintext_password
            }
        }

        const res_success = {
            status: function (code) {
                console.log("status code " + code)
                expect(code).to.equal(200)
                return ({
                    send: function (message) {
                        console.log("success res.send msg = " + JSON.stringify(message));
                        return ({})
                    }
                })
            }
        }

        let x = await user.createUser({
            username: autr_username,
            firstname: 'John',
            lastname: 'Rodley',
            email: 'blah@blah.com',
            password: 'xyz',
            passwordhash: ''
        });
        req_success.body.userid = x.userid
        console.log("new filled user = " + JSON.stringify(x))
        expect(x.userid > 0).to.be.true
        z = await user.setPassword(x.userid, plaintext_password);
        await au.findUser(req_success, res_success)
    })
});
