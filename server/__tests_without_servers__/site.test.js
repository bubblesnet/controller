const config = require("../src/config/locals.js");
const expect = require('chai').expect;
const assert = require('chai').assert;
const test_utils = require('../__tests__/test_utils')
const site = require('../src/api/models/site')
const user = require('../src/api/models/user')

let good_user= {}
let good_site = {}

describe("site CRUD", () => {
    console.log("site CRUD")

    it('site complete CRUD sequence', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined

        let us = {username: 'testymctest', firstname: "Testy", lastname: "McTest", email: 'testy@mctest.com', passwordhash: ''}
        good_user = await user.createUser(us);
        console.log("new user = " + JSON.stringify(good_user))
        expect(good_user.userid >= 0)

        good_site = await site.createSite("test_site_name", good_user.userid)
        expect(good_site.siteid >=0)
        let x = await site.updateSite(good_site.siteid, "test_site_nameX", good_user.userid)
        expect(x.siteid === good_site.siteid).true

        x = await site.deleteSite(good_site.siteid)
        expect(x.siteid === good_site.siteid).true

    })

})