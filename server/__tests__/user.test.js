const config = require("../src/config/locals.js");
const expect = require('chai').expect;
const user = require("../src/api/models/user");

let created_userid = -1

describe("user",  () => {
    console.log("create empty user")
    it('Empty User', function () {

        let x = user.createEmptyUser({})
            .then(response => {
                console.log(x)
                created_userid = x.userid
                expect(x.userid).greaterThanOrEqual(0)
            })
            .catch(response => {
                console.log(x)
                assert(false)
            });
    })
});

describe("user",  () => {
    console.log("update empty user string")
    it('Update User', function () {

        let x = user.updateSingleUserField({userid: created_userid, fieldname: "firstname", value: "BLAH"})
            .then(response => {
                console.log(x)
                expect(x.userid).greaterThanOrEqual(0)
            })
            .catch(response => {
                console.log(x)
                assert(false)
            });
    })
});

describe("user",  () => {
    console.log("update empty user int")
    it('Update User', function () {

        let x = user.updateSingleUserField({userid: created_userid, fieldname: "timezone", value: -5})
            .then(response => {
                console.log(x)
                expect(x.userid).greaterThanOrEqual(0)
            })
            .catch(response => {
                console.log(x)
                assert(false)
            });
    })
});
