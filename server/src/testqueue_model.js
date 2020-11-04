server_db = require('./server_db')
const pool = server_db.getPool()
const endPool = () => {
    pool.end()
}

const getAll = (language) => {
    console.log("testqueue_model getAll("+language+")")
    return new Promise(function (resolve, reject) {
        var ssql = "select BuildableProjectID, Language, Name, SubprojectName, URL, Notes, Category, stars, Major, Minor, Patch, LastCrawledDateTimeMilliseconds, CIPlatforms, BuildTools, TestFrameworks, OperatingSystems, PleaseRetest " +
            "from buildableproject " +
            "where (PleaseRetest is TRUE OR buildableprojectid not in (select buildableprojectid from testrun)) and " +
            "(language like '%rust%' OR language LIKE '%ruby%' OR language LIKE '%java%' OR language LIKE '%node%' OR language LIKE '%go%' OR language LIKE '%python%') order by PleaseRetest desc, stars desc limit 20"

        if(language !== 'all' ) {
            ssql = "select BuildableProjectID, Language, Name, SubprojectName, URL, Notes, Category, stars, Major, Minor, Patch, LastCrawledDateTimeMilliseconds, CIPlatforms, BuildTools, TestFrameworks, OperatingSystems, PleaseRetest " +
                "from buildableproject " +
                "where (PleaseRetest is TRUE OR buildableprojectid not in (select buildableprojectid from testrun)) and " +
                "(language = '"+language+"' OR language LIKE '%"+language+"|%' OR language LIKE '|%"+language+"') order by PleaseRetest desc, stars desc limit 20"
        }
        console.log(ssql)
        pool.query(ssql, (error, results) => {
            if (error) {
                reject(error)
            }
            if (results) {
                array = []
                externalids = []
                lastipaddress = ""
                resolve(results.rows);
            } else {
//                reject("no data")
                resolve({results: []});
            }

        })
    })
}

const clearRetest = (id) => {
    console.log("clearRetest "+id)
    return new Promise(function(resolve, reject) {
        const buildableprojectid = parseInt(id)
        let ssql = "UPDATE buildableproject SET PleaseRetest = false WHERE buildableprojectid=$1"
        console.log(ssql + "   " + buildableprojectid)
        pool.query(ssql, [buildableprojectid], (error, results) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            console.log("results "+JSON.stringify(results))
            resolve({ message: `PleaseRetest cleared for project ID`})
        })
    })
}

module.exports = {
    getAll: getAll,
    endPool: endPool,
    clearRetest: clearRetest,
}