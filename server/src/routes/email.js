/**
 * Created by rodley on 4/21/2017.
 */
var helper = require('sendgrid').mail;
var from_email = new helper.Email('rodley@rodley.com');
var to_email = new helper.Email('john@rodley.com');
var testemailsubject = 'Hello World from the SendGrid Node.js Library!';
var testemailcontent = new helper.Content('text/plain', 'Hello, Email!');
var testemailbody = new helper.Mail(from_email, testemailsubject, to_email, testemailcontent);
var locals = require('../conf/locals');

var sg = require('sendgrid')(locals.getLocals().sendgridFullAccessAPIKey);

exports.sendATestEmail = function (cb) {
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: testemailbody.toJSON(),
    });

    sg.API(request, cb);
};

exports.sendAMessage = function (to, from, subject, shortmessage, longmessage, cb) {
    var content = new helper.Content('text/html', "<html><body><h1>shortmessage</h1><p>" + shortmessage + "</p></body></html>");
    var fromemail = new helper.Email(from);
    var toemail = new helper.Email(to);
    var body = new helper.Mail(fromemail, subject, toemail, content);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: body.toJSON(),
    });

    sg.API(request, cb);
};


exports.sendANotification = function (type, notification, alertcondition, cb) {
    console.log('sendANotification ' + notification.notificationid);
    var content = new helper.Content('text/html', "<html><body><p>" + alertcondition.shortmessage + "</p><p>Reference notification [" + notification.notificationid + "]</p></body></html>");
    var fromemail = new helper.Email(locals.getLocals().sendgridSenderEmailAddress);
    var toemail = new helper.Email(notification.email_recipient);
    var body = new helper.Mail(fromemail, type + ' notification from BubblesWeb', toemail, content);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: body.toJSON(),
    });

    sg.API(request, cb);
};