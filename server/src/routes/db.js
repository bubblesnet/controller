var locals = require("../conf/locals");
var connection;

var handleDisconnect;
// var moment;
var mysql;
// var q;


// q = require('q');
mysql = require('mysql');
// moment = require('moment');

console.log('Creating initial database connection');

connection = mysql.createConnection(locals.getLocals().db_config);

connection.connect();

handleDisconnect = function (myconnection) {
    return myconnection.on('error', function (err) {
        console.log('db error ' + err);
        connection.destroy();
        console.log('CONNECTION LOST - RECONNECTING');
        return setTimeout(function () {
            console.log('Re-creating database connection after error');
            connection = mysql.createConnection(locals.getLocals().db_config);
            handleDisconnect(connection);
            return connection.connect();
        }, 5000);
    });
};

handleDisconnect(connection);

exports.getLastDoorAction = function (userid, deviceid, container, cb) {
    console.log('db.getLastDoorAction ' + userid + '/' + deviceid + ' ' + container);
    return connection.query("select * from currentevent where userid_user = ? AND deviceid_device = ? AND (type = 'DOOR_OPEN' OR type = 'DOOR_CLOSE') AND stringvalue = ? order by datetimemillis desc LIMIT 1", [userid, deviceid, container], function (err, eventresult) {
        console.log('select event returned err ' + err + ' eventresult ' + eventresult);
        console.log('getEvent results = ' + JSON.stringify(eventresult));
//        if (err == null) {
        return cb(err, eventresult);
//        }
    });
};

exports.getLastKnownIPAddress = function (userid, deviceid, cb) {
    console.log("db.getLastKnownIPAddress " + userid + "/" + deviceid);
    console.log("getLastKnownIPAddress select * from currentevent where userid_user = " + userid + " AND deviceid_device = " + deviceid + " AND (type = 'SYSTEM_START') and stringvalue <> 'null' order by datetimemillis desc LIMIT 1;");
    return connection.query("select * from currentevent where userid_user = ? AND deviceid_device = ? AND type = 'SYSTEM_START' and stringvalue <> 'null' order by datetimemillis desc LIMIT 1", [userid, deviceid], function (err, eventresult) {
        console.log('getLastKnownIPAddress select event returned err ' + err + ' eventresult ' + eventresult);
        console.log('getLastKnownIPAddress getEvent results = ' + JSON.stringify(eventresult));
//        if (err == null) {
        return cb(err, eventresult);
//        }
    });
};

exports.getCurrentPicture = function (userid, deviceid, cb) {
    console.log("db.getCurrentPicture " + userid + "/" + deviceid);
    console.log("getCurrentPicture select * from currentevent where userid_user = " + userid + " AND deviceid_device = " + deviceid + " AND (type = 'CURRENT_PICTURE') order by datetimemillis desc LIMIT 1;");
    return connection.query("select * from currentevent where userid_user = ? AND deviceid_device = ? AND type = 'CURRENT_PICTURE' order by datetimemillis desc LIMIT 1", [userid, deviceid], function (err, eventresult) {
        console.log('getCurrentPicture select event returned err ' + err + ' eventresult ' + eventresult);
        console.log('getCurrentPicture getEvent results = ' + JSON.stringify(eventresult));
//        if (err == null) {
        return cb(err, eventresult);
//        }
    });
};

exports.getCurrentStatusFile = function (userid, deviceid, cb) {
    console.log("db.getCurrentStatusFile " + userid + "/" + deviceid);
    console.log("getCurrentStatusFile select * from currentevent where userid_user = " + userid + " AND deviceid_device = " + deviceid + " AND (type = 'CURRENT_STATUS') order by datetimemillis desc LIMIT 1;");
    return connection.query("select * from currentevent where userid_user = ? AND deviceid_device = ? AND type = 'CURRENT_STATUS' order by datetimemillis desc LIMIT 1", [userid, deviceid], function (err, eventresult) {
        console.log('getCurrentStatusFile select event returned err ' + err + ' eventresult ' + eventresult);
        console.log('getCurrentStatusFile getEvent results = ' + JSON.stringify(eventresult));
//        if (err == null) {
        return cb(err, eventresult);
//        }
    });
};

exports.getLastOutletAction = function (userid, deviceid, outletname, cb) {
    console.log("db.getLastOutletAction " + userid + "/" + deviceid + " " + outletname);
    console.log("getLastOutletAction select * from currentevent where userid_user = " + userid + " AND deviceid_device = " + deviceid + " AND (type = 'POWERON' OR type = 'POWEROFF') AND stringvalue = " + outletname + " order by datetimemillis desc LIMIT 1;");
    return connection.query("select * from currentevent where userid_user = ? AND deviceid_device = ? AND (type = 'POWERON' OR type = 'POWEROFF') AND stringvalue = ? order by datetimemillis desc LIMIT 1", [userid, deviceid, outletname], function (err, eventresult) {
        console.log("getLastOutletAction select event returned err " + err + " eventresult " + eventresult);
        console.log("getLastOutletAction getEvent results = " + JSON.stringify(eventresult));
//        if (err == null) {
        return cb(err, eventresult);
//        }
    });
};

exports.getMostRecentEvents = function (userid, deviceid, maxevents, cb) {
    console.log('db.getMostRecentEvents ' + userid + '/' + deviceid + ' maxevents ' + maxevents);
    var TWOHOURSINMILLIS = 12 * 60 * 60 * 1000;
    var leastmillis = new Date().getTime() - TWOHOURSINMILLIS;
    console.log('leastmillis = ' + leastmillis);
    return connection.query("select * from event where userid_User=? and deviceid_Device=? and datetimemillis > ? order by datetimemillis desc LIMIT ?", [userid, deviceid, leastmillis, maxevents], function (err, eventresult) {
        console.log('get most recent events returned err ' + err + ' eventresult ' + JSON.stringify(eventresult));
//        console.log('getEvent results = ' + JSON.stringify(eventresult));
        if (err === null) {
            return cb(err, eventresult);
        }
    });
};

exports.getNewAlertConditions = function (cb) {
    console.log('db.getNewAlertConditions ');
    return connection.query('select * from alertcondition a join usersettings u on a.userid_User = u.userid_User join user us on a.userid_User = us.userid left outer join event e on e.eventid=a.eventid_Event where alertconditionid not in (select alertconditionid_Alertcondition from notification)', [], function (err, result) {
        console.log('select new alert conditions returned err ' + err + ' result ' + result);
        console.log('select new alert conditions results = ' + JSON.stringify(result));
//        if (err == null) {
        return cb(err, result);
//        }
    });
};

exports.getUserSettings = function (userid, cb) {
    console.log("db.getUserSettings " + userid);
    return connection.query('select * from usersettings where userid_user = ?', [userid], function (err, result) {
        console.log('getUserSettings err ' + err + ' result ' + result);
        console.log('getUserSettings results = ' + JSON.stringify(result));
        if (err === null) {
            return cb(err, result);
        }
    });
};

exports.createNotification = function (notification, cb) {
    return connection.query('insert into notification (alertconditionid_Alertcondition, userid_User, datetimemillis, email_required, email_recipient, sms_required, sms_recipient) values (?,?,?,?,?,?,?)',
        [notification.alertconditionid_Alertcondition, notification.userid_User, notification.datetimemillis,
            notification.email_required, notification.email_recipient, notification.sms_required, notification.sms_recipient], function (err, result) {
            console.log('createNotification for alertcondition ' + notification.alertconditionid_Alertcondition + ' returned err ' + err + ' result ' + JSON.stringify(result));
//        console.log('setEmailNotificationSent results = ' + JSON.stringify(result));
//        if (err == null) {
            return cb(err, result);
//        }
        });

};

exports.setEmailNotificationSent = function (notification, cb) {
    return connection.query('update notification set email_sent=1 where notificationid=?', [notification.notificationid], function (err, result) {
        console.log('setEmailNotificationSent id ' + notification.notificationid + ' returned err ' + err + ' result ' + result);
//        if (err == null) {
        return cb(err, result);
//        }
    });
};