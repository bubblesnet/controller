// copyright and license inspection - no issues 4/13/22

const locals = require("../../config/locals");

const Pool = require('pg').Pool

console.log('Creating initial bubbles database connection to '+JSON.stringify(locals.getLocals(true).bubbles_db_config));

let pool = new Pool(localconfig.bubbles_db_config);

exports.getPool = () => {
    return(pool)
}

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

