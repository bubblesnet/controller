/**
 * Created by rodley on 4/21/2017.
 */
const sgMail = require('@sendgrid/mail')
var from_email = 'sendgridrodley@gmail.com';
var to_email = 'sendgridrodley@gmail.com'
var testemailsubject = 'Test of BubblesNet email notification function';
var testemailtext =  'Greetings from Bubblesnet'
var testemailhtml = '<strong>Greetings from Bubblesnet</strong>';
const locals = require('../../config/locals');

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
exports.sendTestEmail2 = function () {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: to_email, // Change to your recipient
        from: from_email, // Change to your verified sender
        subject: testemailsubject,
        text: testemailtext,
        html: testemailhtml,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

/*
exports.sendATestEmail = function (cb) {
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: testemailbody.toJSON(),
    });

    sg.API(request, cb);
};

exports.sendAMessage = function (to, from, subject, shortmessage, longmessage, cb) {
    let content = new helper.Content('text/html', "<html><body><h1>shortmessage</h1><p>" + shortmessage + "</p></body></html>");
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
    let content = new helper.Content('text/html', "<html><body><p>" + alertcondition.shortmessage + "</p><p>Reference notification [" + notification.notificationid + "]</p></body></html>");
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
*/
