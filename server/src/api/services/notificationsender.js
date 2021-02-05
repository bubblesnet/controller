/**
 * Created by rodley on 4/21/2017.
 */
var db = require('../models/bubbles_db');
var email = require('./email');

var notificationsserviced = 0;
var notificationsneeded = 100000;

db.getNewAlertConditions(function (err, result) {
    console.log('called db callback with result = ' + JSON.stringify(result));
    notificationsneeded = result.length;
    var notifications = [];

    for (var i = 0; i < result.length; i++) {
        (function (e) {
            console.log('e = ' + e);
            var alertcondition = result[i];
            console.log('alertcondition = ' + JSON.stringify(alertcondition));
            // create and save a notification with "sent" bits cleared and "required" bits set appropriately
            var type = '';

            switch (alertcondition.type) {
                case 'SYSTEM_START':
                case 'ANDROIDEXCEPTION':
                    type = 'system';
                    break;

                case 'WIFIFAIL':
                case 'WIFICONNECT':
                case 'POWERON':
                case 'POWEROFF':
                    type = 'information';
                    break;

                case 'GERMINATION':
                case 'COTYLEDON':
                case 'FIRSTLEAF':
                    type = 'plant progress';
                    break;

                case 'WATERLEAK':
                    type = 'safety';
                    break;

                case 'DOOR_OPEN':
                case 'DOOR_CLOSE':
                case 'CABINETMOVEMENT':
                case 'POTENTIALHACK':
                    type = 'security';
                    break;

                case 'WATERADDED':
                case 'RESERVOIRCHANGED':
                case 'PHADDED':
                case 'NUTESADDED':
                    type = 'maintenance performed';
                    break;

                case 'WATER_LEVEL_LOW':
                    type = 'maintenance required';
                    break;
            }
            console.log('type = ' + type);
            var email_required = 0;
            var sms_required = 0;
            switch (type) {
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
            notifications[e] = {
                alertconditionid_Alertcondition: alertcondition.alertconditionid,
                userid_User: alertcondition.userid,
                datetimemillis: Date.now(),
                email_required: email_required,
                email_recipient: alertcondition.email,
                sms_required: sms_required,
                sms_recipient: alertcondition.mobilenumber
            };
            db.createNotification(notifications[e], function (err, insertResult) {
                if (err) {
                    console.log("createNotification failed " + err + " skipping send");
                    notificationsserviced++;
                }
                else {
                    console.log("notification " + insertResult.insertId + " saved");
                    notifications[e].notificationid = insertResult.insertId;
                    // if useemail is checked
                    // send email
                    if (notifications[e].email_required) {
                        if (locals.getLocals().sendEmailNotification == true) {
                            console.log("notification " + notifications[e].notificationid + " email is required, sending to " + notifications[e].email_recipient);
                            email.sendANotification(type, notifications[e], alertcondition, function (err, response) {
                                if (err) {
                                    notificationsserviced++;
                                    console.log("send email for notification " + e + " failed " + err);
                                }
                                else {
                                    console.log("notification " + e + " email sent");
                                    db.setEmailNotificationSent(notifications[e], function (err, response) {
                                        console.log("notification sent set for notificationid " + notifications[e].notificationid);
                                        notificationsserviced++;
                                    });
                                }
                            });
                        }
                        else {
                            console.log("notification sent set for IGNORED notificationid " + notifications[e].notificationid);
                            db.setEmailNotificationSent(notifications[e], function (err, response) {
                                console.log("notification sent set for notificationid " + notifications[e].notificationid);
                                notificationsserviced++;
                            });
                        }
                    }
                    else {
                        notificationsserviced++;
                    }
                }
            });
            // save emailsent bit set
            // if usesms is checked
            // send sms
            // save smssent bit set

        })(i);
    }
});

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
})();

