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
const db = require('../models/bubbles_db');
const email = require('./email');
const notification = require('../models/notification')
const alertcondition = require('../models/alertcondition')
const locals = require('../../config/locals')

const log = require("../../bubbles_logger").log

let notificationsserviced = 0;
let notificationsneeded = 100000;

async function getNewAlertConditions() {
    let alerts = await alertcondition.getNewAlertConditions()
        .then(function (result) {
            let notifications = [];
            let notification_count = 0;
//        console.log('called db callback with result = ' + JSON.stringify(result));
            notificationsneeded = result.length;
            for (let i = 0; i < result.rowCount; i++) {
                //               console.log('result[i] = ' + result[i]);
                let alertcondition = result.rows[i];
//                console.log('alertcondition = ' + JSON.stringify(alertcondition));
                // create and save a notification with "sent" bits cleared and "required" bits set appropriately
                let event_class = '';

                switch (alertcondition.type) {
                    case 'SYSTEM_START':
                    case 'ANDROIDEXCEPTION':
                        event_class = 'system';
                        break;

                    case 'WIFIFAIL':
                    case 'WIFICONNECT':
                    case 'POWERON':
                    case 'POWEROFF':
                        event_class = 'information';
                        break;

                    case 'GERMINATION':
                    case 'COTYLEDON':
                    case 'FIRSTLEAF':
                        event_class = 'plant progress';
                        break;

                    case 'WATERLEAK':
                        event_class = 'safety';
                        break;

                    case 'DOOR_OPEN':
                    case 'DOOR_CLOSE':
                    case 'CABINETMOVEMENT':
                    case 'POTENTIALHACK':
                        event_class = 'security';
                        break;

                    case 'WATERADDED':
                    case 'RESERVOIRCHANGED':
                    case 'PHADDED':
                    case 'NUTESADDED':
                        event_class = 'maintenance performed';
                        break;

                    case 'WATER_LEVEL_LOW':
                        event_class = 'maintenance required';
                        break;
                    case 'testtype':
                        event_class = 'testing';
                        break;
                    default:
                        log.error("Bad alert type " + alertcondition.type)
                        break;
                }
                log.info('event_class = ' + event_class + " alert_condition type " + alertcondition.type + " useemail "+alertcondition.useemailforsecurity);
                let email_required = "0";
                let sms_required = "0";
                switch (event_class) {
                    case 'testing':
                        email_required = "1";
                        sms_required = "1";
                        break;

                    case 'safety':
                    case 'security':
                    case 'system':
                        email_required = alertcondition.useemailforsecurity;
                        sms_required = alertcondition.usesmsforsecurity;
                        break;
                    case 'plant progress':
                        email_required = alertcondition.useemailforplantprogress;
                        sms_required = alertcondition.usesmsforplantprogress;
                        break;
                    case 'maintenance required':
                        email_required = alertcondition.useemailformaintenancerequired;
                        sms_required = alertcondition.usesmsformaintenancerequired;
                        break;
                    case 'information':
                        email_required = alertcondition.useemailforinformation;
                        sms_required = alertcondition.usesmsforinformation;
                        break;
                }
                note = {
                    alertconditionid_Alertcondition: alertcondition.alertconditionid,
                    userid: alertcondition.userid_user,
                    datetimemillis: Date.now(),
                    email_required: email_required,
                    email_recipient: alertcondition.email,
                    sms_required: sms_required,
//                    sms_recipient: alertcondition.mobilenumber
                };
                log.info('note = ' + JSON.stringify(note));
                notifications.push(note)
                log.info("notifications " + JSON.stringify(notifications))
                notification.createNotification(note, function (err, insertResult) {
                    if (err) {
                        log.error("createNotification failed " + err + " skipping send");
                        notificationsserviced++;
                    } else {
                        note.notificationid = insertResult.rows[0].notificationid;
                        log.info("notification " + note.notificationid + " saved");
                        // if useemail is checked
                        // send email
                        log.info("note = " + JSON.stringify(note))
                        log.info("note.email_required = "+(typeof note.email_required)+" " + note.email_required + " sendEmailNotification = " + locals.getLocals().sendEmailNotification )
                        if (note.email_required === "1") {
                            if (locals.getLocals(false).sendEmailNotification === true) {
                                log.info("notification " + note.notificationid + " email is required, sending to " + note.email_recipient);
                                email.sendANotification(event_class, note, alertcondition, function (err, response) {
                                    if (err) {
                                        notificationsserviced++;
                                        log.info("send email for notification " + notification_count + " failed " + err);
                                    } else {
                                        log.info("notification " + notification_count + " email sent");
                                        notification.setEmailNotificationSent(note, function (err, response) {
                                            log.info("notification sent set for notificationid " + note.notificationid);
                                            notificationsserviced++;
                                        });
                                    }
                                });
                            } else {
                                log.info("notification sent set for IGNORED notificationid " + note.notificationid);
                                notification.setEmailNotificationSent(note, function (err, response) {
                                    log.info("notification sent set for notificationid " + note.notificationid);
                                    notificationsserviced++;
                                });
                            }
                        } else {
                            notificationsserviced++;
                        }
                    }
                });
                notification_count++
                // save emailsent bit set
                // if usesms is checked
                // send sms
                // save smssent bit set
            }
            return (notifications)
        })
        .catch(function (err) {
            return(err)
        });
    return (alerts)
}

/*
(function wait() {
    console.log("wait");
    if (notificationsserviced !== notificationsneeded) {
        console.log("notificationsserviced = " + notificationsserviced + " != notificationsneeded " + notificationsneeded);
        setTimeout(wait, 1000);
    }
    else {
        console.log('process.exit');
        process.exit();
    }
})();}

 */

module.exports = {
    getNewAlertConditions: getNewAlertConditions
};

