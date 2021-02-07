/**
 * Created by rodley on 4/21/2017.
 */

const email = require('../services/email');
const alertcondition = require('./alertcondition')

const server_db = require('./bubbles_db')
const pool = server_db.getPool()
const endPool = () => {
    pool.end()
}

exports.createNotification = function (notification, cb) {
    return pool.query('insert into notification (alertconditionid_Alertcondition, userid_User, datetimemillis, email_required, email_recipient, sms_required, sms_recipient) values (?,?,?,?,?,?,?)',
        [notification.alertconditionid_Alertcondition, notification.userid_User, notification.datetimemillis,
            notification.email_required, notification.email_recipient, notification.sms_required, notification.sms_recipient], function (err, result) {
            //           console.log('createNotification for alertcondition ' + notification.alertconditionid_Alertcondition + ' returned err ' + err + ' result ' + JSON.stringify(result));
//        console.log('setEmailNotificationSent results = ' + JSON.stringify(result));
//        if (err == null) {
            return cb(err, result);
//        }
        });

};

exports.setEmailNotificationSent = function (notification, cb) {
    return pool.query('update notification set email_sent=1 where notificationid=?', [notification.notificationid], function (err, result) {
        console.log('setEmailNotificationSent id ' + notification.notificationid + ' returned err ' + err + ' result ' + result);
//        if (err == null) {
        return cb(err, result);
//        }
    });
};
