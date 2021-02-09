const locals = require("../../config/locals");


const Pool = require('pg').Pool

console.log('Creating initial bubbles database connection to '+JSON.stringify(locals.getLocals().bubbles_db_config));

let pool = new Pool(localconfig.bubbles_db_config);

exports.getPool = () => {
    return(pool)
}
/*
exports.getLastDoorAction = function (userid, deviceid, container, cb) {
    console.log('db.getLastDoorAction ' + userid + '/' + deviceid + ' ' + container);
    return pool.query("select * from currentevent where userid_user = ? AND deviceid_device = ? AND (type = 'DOOR_OPEN' OR type = 'DOOR_CLOSE') AND stringvalue = ? order by datetimemillis desc LIMIT 1", [userid, deviceid, container], function (err, eventresult) {
        console.log('select event returned err ' + err + ' eventresult ' + eventresult);
        console.log('getEvent results = ' + JSON.stringify(eventresult));
//        if (err == null) {
        return cb(err, eventresult);
//        }
    });
};
*/

exports.getLastKnownIPAddress = async function (userid, deviceid, cb) {
    console.log("db.getLastKnownIPAddress " + userid + "/" + deviceid);
    console.log("getLastKnownIPAddress select * from currentevent where userid_user = " + userid + " AND deviceid_device = " + deviceid + " AND (type = 'SYSTEM_START') and stringvalue <> 'null' order by datetimemillis desc LIMIT 1;");
    return new Promise(function(resolve, reject) {
        pool.query("select * from currentevent where userid_user = $1 AND deviceid_device = $2 AND type = 'SYSTEM_START' and stringvalue <> 'null' order by datetimemillis desc LIMIT 1", [userid, deviceid], function (err, eventresult) {
            console.log('getLastKnownIPAddress select event returned err ' + err + ' eventresult ' + eventresult);
            console.log('getLastKnownIPAddress getEvent results = ' + JSON.stringify(eventresult));
            resolve( cb(err, eventresult));
        });
    })
};

/*
exports.getCurrentPicture = function (userid, deviceid, cb) {
    console.log("db.getCurrentPicture " + userid + "/" + deviceid);
    console.log("getCurrentPicture select * from currentevent where userid_user = " + userid + " AND deviceid_device = " + deviceid + " AND (type = 'CURRENT_PICTURE') order by datetimemillis desc LIMIT 1;");
    return pool.query("select * from currentevent where userid_user = ? AND deviceid_device = ? AND type = 'CURRENT_PICTURE' order by datetimemillis desc LIMIT 1", [userid, deviceid], function (err, eventresult) {
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
    return pool.query("select * from currentevent where userid_user = ? AND deviceid_device = ? AND type = 'CURRENT_STATUS' order by datetimemillis desc LIMIT 1", [userid, deviceid], function (err, eventresult) {
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
    return pool.query("select * from currentevent where userid_user = ? AND deviceid_device = ? AND (type = 'POWERON' OR type = 'POWEROFF') AND stringvalue = ? order by datetimemillis desc LIMIT 1", [userid, deviceid, outletname], function (err, eventresult) {
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
    return pool.query("select * from event where userid_User=? and deviceid_Device=? and datetimemillis > ? order by datetimemillis desc LIMIT ?", [userid, deviceid, leastmillis, maxevents], function (err, eventresult) {
 //       console.log('get most recent events returned err ' + err + ' eventresult ' + JSON.stringify(eventresult));
//        console.log('getEvent results = ' + JSON.stringify(eventresult));
        if (err === null) {
            return cb(err, eventresult);
        }
    });
};
*/

