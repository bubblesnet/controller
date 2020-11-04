server_db = require('./server_db')
const pool = server_db.getPool()
const endPool = () => {
    pool.end()
}

const getTestRuns = () => {
    console.log("testrun_model getTestRuns")
    return new Promise(function (resolve, reject) {
        var ssql = "select t.buildableprojectid, result, failedonstage, stagefailuremessage, stars, name, subprojectname, w.ipaddress, language,  to_timestamp(testrunstartdatetimemilliseconds) as ts,ephemeralDiskFreeMBEnd,(ephemeralDiskFreeMBEnd - ephemeralDiskFreeMBStart) as leak,url, "
            + " board, testrunid, deploymentmechanisms, operatingsystems, ciplatforms, buildtools, testframeworks, PleaseRetest from testrun t "
            + " join buildableproject b on b.buildableprojectid = t.buildableprojectid "
            + " join workermachine w on w.workermachineid = t.workermachineid "
            + " join hardwareplatform h on h.hardwareplatformid = w.hardwareplatformid "
            + " order by testrunid desc limit 100"
        pool.query(ssql, (error, results) => {
            if (error) {
                reject(error)
            }
            if (results) {
                resolve(results.rows);
            } else {
 //               reject("no data")
                resolve({results: []});
            }
        })
    })
}
const createTestRun = (body) => {
    return new Promise(function(resolve, reject) {
        const { buildableprojectid } = body
        pool.query('INSERT INTO testrun (buildableprojectid) VALUES ($1) RETURNING *', [buildableprojectid], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`A new testrun has been added added: ${results.rows[0]}`)
        })
    })
}

const retestTestRun = (body) => {
    console.log(body)
    const { selectedprojects } = body
    var ssql =     'update buildableproject set PleaseRetest = true where buildableprojectid in (select buildableprojectid from testrun where testrunid in ('+selectedprojects+')) RETURNING *'
    console.log(ssql)
    return new Promise(function(resolve, reject) {
        console.log("retestTestRun "+body)
        console.log(ssql)
        pool.query('update buildableproject set PleaseRetest = true where buildableprojectid in (select buildableprojectid from testrun where testrunid in ('+selectedprojects+')) RETURNING *',  (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Retest has been set`)
        })
    })
}

const deleteTestRun = () => {
    return new Promise(function(resolve, reject) {
        const id = parseInt(request.params.id)
        pool.query('DELETE FROM testrun WHERE testrunid = $1', [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Testrun deleted with ID: ${id}`)
        })
    })
}

module.exports = {
    retestTestRun: retestTestRun,
    getTestRuns: getTestRuns,
    createTestRun: createTestRun,
    deleteTestRun: deleteTestRun,
    endPool: endPool,
}