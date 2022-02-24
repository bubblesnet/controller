const locals = require("../../config/locals");
const server_db = require('./bubbles_db')
const pool = server_db.getPool()
const endPool = () => {
    pool.end()
}

async function createSite(sitename,userid) {
    return new Promise(function(resolve, reject) {
        pool.query("insert into site (sitename,userid_user) values( $1,$2 ) RETURNING *",
            [sitename,userid], (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    console.log("new site " + JSON.stringify(results.rows[0]))
                    resolve({siteid: results.rows[0].siteid, message: "A new site has been added :" + results.rows[0].siteid})
                }
            })
    })
}

async function updateSite(siteid,sitename,userid) {
    return new Promise(function(resolve, reject) {
        pool.query("update site set sitename=$1, userid_user=$2 where siteid=$3 RETURNING *",
            [sitename,userid,siteid], (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    console.log("updated site " + JSON.stringify(results.rows[0]))
                    resolve({siteid: results.rows[0].siteid, message: "Site has been updated :" + results.rows[0].siteid})
                }
            })
    })
}

async function deleteSite(siteid) {
    return new Promise(function(resolve, reject) {
        pool.query("delete from site where siteid=$1 RETURNING *",
            [siteid], (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    console.log("deleted site " + JSON.stringify(results.rows[0]))
                    resolve({siteid: results.rows[0].siteid, message: "Site has been deleted :" + results.rows[0].siteid})
                }
            })
    })
}

module.exports = {
    createSite,
    deleteSite,
    updateSite
}
