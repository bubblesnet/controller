const config = require("../src/config/locals.js");
const expect = require('chai').expect;
const user = require("../src/api/models/user");
const assert = require('chai').assert;
const auth = require('../src/api/authcontroller')
const email = require('../src/api/services/email')

let created_userid = -1

describe("email",   () => {
    console.log("send test email")
    it('send test email', function () {
        email.sendATestEmail();
        console.log("after sendATestEmail")
    });

    it('send test email', function () {
        console.log("callback from sendAMessage");
        let alertcondition = {
            shortmessage: "Short message"
        }
        let notification = {
            email_recipient: "sendgridrodley@gmail.com",
            notificationid: 10944
        }
        email.sendANotification("testype", notification, alertcondition, function (err) {
            expect(!err)
        });
        console.log("after sendANotification")
    });

});
