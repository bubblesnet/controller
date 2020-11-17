/**
 * Created by rodley on 4/12/2017.
 */

var db = require("../src/api/models/icebreaker_db");


describe('Get last door action', function () {
    it("getLastDoorAction should return", function (done) {
        console.log('calling last door action');
        db.getLastDoorAction("90000009", "70000031", "CABINET", function (err, eventresult) {
            console.log("called db callback with eventresult = " + JSON.stringify(eventresult));
            done();
        });
    });
});


describe('Get new alertconditions action', function () {
    it("getNewAlertConditions should return", function (done) {
        db.getNewAlertConditions(function (err, result) {
            console.log('called db callback with result = ' + JSON.stringify(result));
            done();
        });
    });
});

/*
describe('Create notification', function () {
    it("createNotification should return 200", function (done) {
        var notification = {
            alertconditionid_Alertcondition: 33,
            userid_User: 90000010,
            datetimemillis: new Date().getTime(),
            email_required: 0,
            email_recipient: 'test@rodley.com',
            sms_required: 0,
            sms_recipient: ''
        };

        db.createNotification(notification, function (err, result) {
            console.log('called db callback with result = ' + JSON.stringify(result));
            done();
        });
    });
});

*/

describe('Set notificationemail sent', function () {
    it('Set notificationemail sent', function (done) {
        var notification = {
            notificationid: 2
        };

        db.setEmailNotificationSent(notification, function (err, result) {
            console.log('called db callback with result = ' + JSON.stringify(result));
            done();
        });
    });
});

