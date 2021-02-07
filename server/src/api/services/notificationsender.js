/**
 * Created by rodley on 4/21/2017.
 */
const db = require('../models/bubbles_db');
const email = require('./email');
const notification = require('../models/notification')
const alertcondition = require('../models/alertcondition')

let notificationsserviced = 0;
let notificationsneeded = 100000;

function getNewAlertConditions(cb) {
    let alerts = alertcondition.getNewAlertConditions(function (err, result) {
        let notifications = [];
        let notification_count = 0;
//        console.log('called db callback with result = ' + JSON.stringify(result));
        notificationsneeded = result.length;
        for (let i = 0; i < result.length; i++) {
 //               console.log('result[i] = ' + result[i]);
                let alertcondition = result[i];
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
                console.log('event_class = ' + event_class);
                var email_required = 0;
                var sms_required = 0;
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
                console.log('alertconditionid = ' + alertcondition.alertconditionid + ' userid = ' + alertcondition.userid_User);
                notifications.push( {
                    alertconditionid_Alertcondition: alertcondition.alertconditionid,
                    userid_User: alertcondition.userid,
                    datetimemillis: Date.now(),
                    email_required: email_required,
                    email_recipient: alertcondition.email,
                    sms_required: sms_required,
//                    sms_recipient: alertcondition.mobilenumber
                });
                notification.createNotification(notifications[notification_count], function (err, insertResult) {
                    if (err) {
                        console.log("createNotification failed " + err + " skipping send");
                        notificationsserviced++;
                    } else {
                        console.log("notification " + insertResult.insertId + " saved");
                        notifications[notification_count].notificationid = insertResult.insertId;
                        // if useemail is checked
                        // send email
                        if (notifications[notification_count].email_required) {
                            if (locals.getLocals().sendEmailNotification === true) {
                                console.log("notification " + notifications[notification_count].notificationid + " email is required, sending to " + notifications[notification_count].email_recipient);
                                email.sendANotification(type, notifications[notification_count], alertcondition, function (err, response) {
                                    if (err) {
                                        notificationsserviced++;
                                        console.log("send email for notification " + notification_count + " failed " + err);
                                    } else {
                                        console.log("notification " + notification_count + " email sent");
                                        notification.setEmailNotificationSent(notifications[notification_count], function (err, response) {
                                            console.log("notification sent set for notificationid " + notifications[notification_count].notificationid);
                                            notificationsserviced++;
                                        });
                                    }
                                });
                            } else {
                                console.log("notification sent set for IGNORED notificationid " + notifications[notification_count].notificationid);
                                notification.setEmailNotificationSent(notifications[notification_count], function (err, response) {
                                    console.log("notification sent set for notificationid " + notifications[notification_count].notificationid);
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
        return(cb (notifications))
    });
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

