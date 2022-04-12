const config = require("../src/config/locals.js");
const expect = require('chai').expect;
const assert = require('chai').assert;
const test_utils = require('../__tests__/test_utils')
const site = require('../src/api/models/site')
const user = require('../src/api/models/user')
const station = require('../src/api/models/station')
const sitestation = require('../src/api/models/sitestation')

let good_user= {}
let good_site = {}

describe("station CRUD", () => {
    console.log("station CRUD")

    it('station complete CRUD sequence', async function () {
        console.log("process.env.NODE_ENV = "+process.env.NODE_ENV)
        expect( process.env.NODE_ENV ).not.to.be.undefined

        let us = {username: 'testymctest', firstname: "Testy", lastname: "McTest", email: 'testy@mctest.com', passwordhash: ''}
        good_user = await user.createUser(us);
        console.log("new user = " + JSON.stringify(good_user))
        expect(good_user.userid >= 0)

        good_site = await site.createSite("test_site_name", good_user.userid)
        expect(good_site.siteid >=0)

        let good_station = await station.addStation("test station", good_site.siteid)
        expect( good_station.stationid >= 0 )
        console.log("Added station id " + good_station.stationid)

        let x = await station.updateStation(good_station.stationid, "updated name")
        expect(x.stationid === good_station.stationid)

        x = await station.deleteStation(good_station.stationid)
        expect(x.stationid === good_station.stationid)

        x = await site.deleteSite(good_site.siteid)
        expect(x.siteid === good_site.siteid).true

    })

})