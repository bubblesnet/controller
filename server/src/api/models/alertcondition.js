const locals = require("../../config/locals");

const server_db = require('./bubbles_db')
const pool = server_db.getPool()
const endPool = () => {
    pool.end()
}

async function createAlertCondition(alert) {
    return new Promise(function(resolve, reject) {
        console.log("inserting new alertcondition "+JSON.stringify(alert))

        pool.query("INSERT INTO alertcondition (shortmessage, longmessage, userid_User, " +
            "deviceid_Device, triggered_datetimemillis, eventid_Event) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
                [alert.shortmessage, alert.longmessage, alert.userid,
            alert.deviceid, alert.triggered_datetimemillis, alert.eventid], (error, results) => {
            if (error) {
                console.error("rejecting with error " + error)
                reject(error)
            } else {
                console.log("new alertcondition " + results.rows[0])
                resolve({alertcondition: results.rows[0].alertconditionid, message: "A new alertcondition has been added :" + results.rows[0].alertconditionid})
            }
        })
    })
}

async function getNewAlertConditions () {
    console.log('db.getNewAlertConditions ');
    return new Promise(function (resolve, reject) {
        pool.query('select * from alertcondition a join usersettings u on a.userid_User = u.userid_User join public.user us on a.userid_User = us.userid left outer join event e on e.eventid=a.eventid_Event where alertconditionid not in (select alertconditionid_Alertcondition from notification where alertconditionid_Alertcondition is not null)',
            [], function (err, result) {
                console.log('select new alert conditions returned err ' + err + ' result ' + result);
                console.log('select new alert conditions results = ' + JSON.stringify(result.rows));
                if (err != null) {
                    reject(err);
                } else {
                    resolve(result)
                }
            });
    })
}



module.exports = {
    createAlertCondition:createAlertCondition,
    getNewAlertConditions
}