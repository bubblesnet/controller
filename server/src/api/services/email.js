/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Created by rodley on 4/21/2017.
 */
const sgMail = require('@sendgrid/mail')
const from_email = 'sendgridrodley@gmail.com';
const to_email = 'sendgridrodley@gmail.com'
const test_email_subject = 'Test of BubblesNet email notification function';
const test_email_text =  'Greetings from Bubblesnet'
const test_email_html = '<strong>Greetings from Bubblesnet</strong>';
const locals = require('../../config/locals');

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
function sendATestEmail () {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: to_email, // Change to your recipient
        from: from_email, // Change to your verified sender
        subject: test_email_subject,
        text: test_email_text,
        html: test_email_html,
    }
    console.log("Sending email via unit test")

    sgMail.send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error("sendATestEmail error " + error)
        })
}

function sendAMessage(to, from, subject, shortmessage, longmessage, cb) {
    const msg = {
        to: to, // Change to your recipient
        from: from, // Change to your verified sender
        subject: subject,
        text: shortmessage,
        html: "<html><body><h1>"+shortmessage+"</h1><p>" + longmessage + "</p></body></html>",
    }
    if( typeof locals.getLocals(false).dontSendEmail === 'undefined' || locals.getLocals(false).dontSendEmail === true ) {
        console.log("Skipping actual send of email since config.dontSendEmail = " + locals.getLocals(false).dontSendEmail )
        cb(null);
    } else {
        sgMail.send(msg)
            .then(() => {
                console.log('Email sent')
                cb(null);
            })
            .catch((error) => {
                console.error("sendAMessage error " + error)
                cb(error);
            })
    }
}



function sendANotification (type, notification, alertcondition, cb) {
    console.log('sendANotification ' + notification.notificationid);
    sendAMessage(notification.email_recipient,locals.getLocals(false).sendgridSenderEmailAddress,
        type + ' notification from BubblesWeb',alertcondition.shortmessage,
        "Reference notification [" + notification.notificationid + "]", function(err) {
            console.log("callback from sendAMessage with err = " + err);
            cb(err,"sent")
        })
};

module.exports = {
    sendANotification:sendANotification,
    sendAMessage:sendAMessage,
    sendATestEmail:sendATestEmail
}

