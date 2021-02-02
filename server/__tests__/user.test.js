const config = require("../src/config/locals.js");
const expect = require('chai').expect;
const user = require("../src/api/models/user");
const assert = require('assert');
const auth = require('../src/api/authcontroller')

let created_userid = -1

describe("user",   () => {
    console.log("create empty user")
    it('Empty User', async function () {
        try {
            let x = await user.createEmptyUser({});
            console.log("new user = " + JSON.stringify(x))
            created_userid = x.userid
            expect(created_userid >= 0)
        } catch (err) {
            console.log("new user error "+err)
            assert(false)
        }
    })
});

describe("user",   () => {
    console.log("create filled user")
    it('Filled User', async function () {
        try {
            let x = await user.createUser({firstname:'John',lastname:'Rodley', email:'blah@blah.com', password:'xyz'});
            console.log("new filled user = " + JSON.stringify(x))
            created_userid = x.userid
            expect(created_userid >= 0)
        } catch (err) {
            console.log("new user error "+err)
            assert(false)
        }
    })
});


describe("user",  () => {
    console.log("update empty user string")
    it('Update User', function () {
        console.log("created_userid = " + JSON.stringify(created_userid))
        let x = user.updateSingleUserField({userid: created_userid, fieldname: "firstname", value: "BLAH"})
            .then(function() {
                console.log("user x = " + x)
                expect(x.userid >= 0)
            })
            .catch(function(err) {
                console.log("update user catch error "+err+" response = " + x)
                assert(false)
            });
    })
});

describe("user",  () => {
    console.log("update empty user string")
    it('Generate error bad user in updateSingleUserField string', function () {
        console.log("created_userid = " + JSON.stringify(created_userid))
        let x = user.updateSingleUserField({userid: -99, fieldname: "firstname", value: "BLAH"})
            .then(function() {
                console.log("user x = " + x)
                assert(false)
            })
            .catch(function(err) {
                console.log("update user catch error "+err+" response = " + x)
                expect(err)
            });
    })
});

describe("user",  () => {
    console.log("update empty user string")
    it('Generate error bad user in updateSingleUserField int', function () {
        console.log("created_userid = " + JSON.stringify(created_userid))
        let x = user.updateSingleUserField({userid: -99, fieldname: "timezone", value: -5})
            .then(function() {
                console.log("user x = " + x)
                assert(false)
            })
            .catch(function(err) {
                console.log("update user catch error "+err+" response = " + x)
                expect(err)
            });
    })
});


describe("user",  () => {
    console.log("update empty user int")
    it('Update User', function () {

        let x = user.updateSingleUserField({userid: created_userid, fieldname: "timezone", value: -5})
            .then(function() {
                console.log(JSON.stringify(x))
                expect(x.userid>=0)
            })
            .catch(function(err) {
                console.log("empty user catch error = " + err)
                assert(false)
            });
    })
});


describe("auth",   () => {
    console.log("set good password for real empty user")
    it('Set password', async function () {
        try {
            const plaintext_password = 'xyz'
            let x = await user.setPassword(created_userid, plaintext_password);

            expect(created_userid >= 0)
            expect(x.userid >= 0)
        } catch (err) {
            console.log("new user error " + err)
            assert(false)
        }
    })
});

describe("auth",   () => {
    console.log("set good password for bogus user")
    it('Generate error in set password', async function () {
        try {
            const plaintext_password = 'xyz'
            let x = await user.setPassword(-1, plaintext_password);
            assert(false)
        } catch (err) {
            console.log("set pw error " + err)
            expect(err)
        }
    })
});

describe("user",  () => {
    console.log("delete empty user")
    it('Delete real empty user', function () {

        let x = user.deleteUser(created_userid)
            .then(response => {
                console.log("delete user x = " + JSON.stringify(x))
                expect(x.userid>=0)
            })
            .catch(function(err){
                console.log("delete user catch error "+err)
                assert(false)
            });
    })
});

describe("user",  () => {
    console.log("Generate error in delete user")
    it('Generate error in delete user', function () {
        let x = user.deleteUser(-9)
            .then(response => {
                console.log("delete user x = " + JSON.stringify(x))
                assert(false)
            })
            .catch(function(err){
                console.log("delete user catch error "+err)
                expect(err)
            });
    })
});

