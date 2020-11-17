server_db = require('../icebreaker_db')
const pool = server_db.getPool()
const endPool = () => {
    pool.end()
}

const getDeviceStatus = (id) => {
    console.log("devicestatus_model getDeviceStatus")
    return new Promise(function(resolve, reject) {
        var ssql = "select "+
            " w.externalid, stars, result, failedonstage, name, subprojectname, w.ipaddress, language, stagefailuremessage, to_timestamp(testrunstartdatetimemilliseconds) as ts,(ephemeralDiskFreeMBEnd - ephemeralDiskFreeMBStart) as leak,url, " +
            " board, testrunid, deploymentmechanisms,  operatingsystems, buildtools, testframeworks, ciplatforms, PleaseRetest, " +
            " ttt.workermachineid, ttt.ephemeraldiskfreembstart, ttt.persistentdiskfreembstart,w.ipaddress, w.externalid, ttt.testrunid from currentworkermachinetestrun " +
            " natural join testrun ttt " +
            " join buildableproject b on b.buildableprojectid = ttt.buildableprojectid " +
            " join workermachine w on w.workermachineid = ttt.workermachineid " +
            " join hardwareplatform h on h.hardwareplatformid = w.hardwareplatformid " +
            " order by ipaddress, externalid, ttt.testrunid desc"
        var start = (new Date()).getTime();

        pool.query(ssql, (error, results) => {
            if (error) {
                console.log("error " + error)
                reject(error)
            }
            if( results ) {
                let array = []
                externalids = []
                let ipaddresses = []
                results.rows.forEach(function (item, index) {
                    if ((!externalids.includes(item.externalid)) || !(ipaddresses.includes(item.ipaddress))) {
                        array = array.concat(item)
                        externalids = externalids.concat(item.externalid)
                        ipaddresses = ipaddresses.concat(item.ipaddress)
                    }
                });
                var end = (new Date()).getTime();
                millis = end-start
                console.log("getDeviceStatus took "+millis/1000+" seconds")
                resolve(array);
            } else {
//                reject("no data")
                resolve({results: []});
            }
        })
    })
}


module.exports = {
    getDeviceStatus: getDeviceStatus,
    endPool: endPool,
}