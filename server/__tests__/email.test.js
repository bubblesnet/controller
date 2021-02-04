const config = require("../src/config/locals.js");
const expect = require('chai').expect;
const user = require("../src/api/models/user");
const assert = require('chai').assert;
const auth = require('../src/api/authcontroller')
const email = require('../src/api/services/email')

let created_userid = -1

describe("email",   () => {
    console.log("send test email")
    it('send test email',  function () {
            email.sendTestEmail2();
     })
});
