/**
 * Created by rodley on 4/21/2017.
 */
const sghelper = require('@sendgrid/helpers')
const sgMail = require('@sendgrid/mail')
var from_email = 'sendgridrodley@gmail.com';
var to_email = 'sendgridrodley@gmail.com'
var testemailsubject = 'Test of BubblesNet email notification function';
var testemailtext =  'Greetings from Bubblesnet'
var testemailhtml = '<strong>Greetings from Bubblesnet</strong>';
const locals = require('../../config/locals');

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
exports.sendATestEmail = function () {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: to_email, // Change to your recipient
        from: from_email, // Change to your verified sender
        subject: testemailsubject,
        text: testemailtext,
        html: testemailhtml,
    }
    console.log("Sending email via unit test")

    sgMail.send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

exports.sendAMessage = function (to, from, subject, shortmessage, longmessage, cb) {
    const msg = {
        to: to, // Change to your recipient
        from: from, // Change to your verified sender
        subject: subject,
        text: shortmessage,
        html: "<html><body><h1>"+shortmessage+"</h1><p>" + longmessage + "</p></body></html>",
    }

    sgMail.send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
    cb();
};

email = require('./email')

exports.sendANotification = function (type, notification, alertcondition, cb) {
    console.log('sendANotification ' + notification.notificationid);
    email.sendAMessage(notification.email_recipient,locals.getLocals().sendgridSenderEmailAddress,
        type + ' notification from BubblesWeb',alertcondition.shortmessage,
        "Reference notification [" + notification.notificationid + "]", function() {
            console.log("callback from sendAMessage");
        })
};

