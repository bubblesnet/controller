/**
 * Created by rodley on 4/21/2017.
 */
const db = require('../models/bubbles_db');
const email = require('./email');
const notification = require('../models/notification')
const alertcondition = require('../models/alertcondition')
const locals = require('../../config/locals')

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
                }
                console.log('event_class = ' + event_class + " alert_condition type " + alertcondition.type + " useemail "+alertcondition.useemailforsecurity);
                let email_required = "0";
                let sms_required = "0";
                switch (event_class) {
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
                console.log('note = ' + JSON.stringify(note));
                notifications.push(note)
                console.log("notifications " + JSON.stringify(notifications))
                notification.createNotification(note, function (err, insertResult) {
                    if (err) {
                        console.log("createNotification failed " + err + " skipping send");
                        notificationsserviced++;
                    } else {
                        note.notificationid = insertResult.rows[0].notificationid;
                        console.log("notification " + note.notificationid + " saved");
                        // if useemail is checked
                        // send email
                        console.log("note = " + JSON.stringify(note))
                        console.log("note.email_required = " + note.email_required )
                        if (note.email_required === "1") {
                            if (locals.getLocals().sendEmailNotification === true) {
                                console.log("notification " + note.notificationid + " email is required, sending to " + note.email_recipient);
                                email.sendANotification(event_class, note, alertcondition, function (err, response) {
                                    if (err) {
                                        notificationsserviced++;
                                        console.log("send email for notification " + notification_count + " failed " + err);
                                    } else {
                                        console.log("notification " + notification_count + " email sent");
                                        notification.setEmailNotificationSent(note, function (err, response) {
                                            console.log("notification sent set for notificationid " + note.notificationid);
                                            notificationsserviced++;
                                        });
                                    }
                                });
                            } else {
                                console.log("notification sent set for IGNORED notificationid " + note.notificationid);
                                notification.setEmailNotificationSent(note, function (err, response) {
                                    console.log("notification sent set for notificationid " + note.notificationid);
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

