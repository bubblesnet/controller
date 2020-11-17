server_db = require('../icebreaker_db')
const pool = server_db.getPool()
const endPool = () => {
    pool.end()
}

const getSbcs = () => {
    console.log("sbc_model getSbcs")
    return new Promise(function (resolve, reject) {
        var ssql = "select * from sbc "
            + " order by discontinued, manufacturer, productname"
        pool.query(ssql, (error, results) => {
            if (error) {
                reject(error)
            }
            if (results) {
                for( i = 0; i < results.rows.length; i++ ) {
                    results.rows[i].port = process.env.PORT
                    results.rows[i].database = process.env.ICEBREAKER_DB
                }
 //               console.log("sbcs " + results)
                resolve(results.rows);
            } else {
 //               reject("no data")
                resolve({results: []});
            }
        })
    })
}
const createEmptySbc = (body) => {
    return new Promise(function(resolve, reject) {
        console.log("inserting new SBC")
        pool.query("INSERT INTO sbc (manufacturer,productname) VALUES ('','') RETURNING *", [], (error, results) => {
            if (error) {
                reject(error)
            }
            console.log("new sbcid " + results.rows[0])
            resolve({sbcid: results.rows[0], message: "A new sbc has been added added:"+results.rows[0]})
        })
    })
}

const updateSbc = (body) => {
    return new Promise(function(resolve, reject) {
        console.log('updateSbc')
        console.log("body = "+body)
        ssql = 'UPDATE sbc SETx '+body.fieldname+' = '+body.value+' WHERE sbcid='+body.sbcid;
        console.log(ssql)
        console.log(' typeof(body.value) = ' +  typeof(body.value))
        if( typeof(body.value) === "string") {
            pool.query(`UPDATE sbc SET ${body.fieldname} = '${body.value}' WHERE sbcid = ${body.sbcid}`, (error, results) => {
                if (error) {
                    console.log(error)
                    reject(error)
                }
                resolve({sbcid: body.sbcid, message: 'sbc id ' + body.sbcid + ' has been updated'})
            })

        } else {
            pool.query(`UPDATE sbc SET ${body.fieldname} = ${body.value} WHERE sbcid = ${body.sbcid}`, (error, results) => {
                if (error) {
                    console.log(error)
                    reject(error)
                }
                resolve({sbcid: body.sbcid, message: 'sbc id ' + body.sbcid + ' has been updated'})
            })
        }
    })
}


const deleteSbc = (id) => {
    console.log("deleteSbc "+id)
    return new Promise(function(resolve, reject) {
        const sbcid = parseInt(id)
        console.log("DELETE FROM sbc WHERE sbcid "+sbcid)

        pool.query('DELETE FROM sbc WHERE sbcid = $1', [sbcid], (error, results) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            console.log("results "+JSON.stringify(results))
            resolve({ message: `SBC deleted with ID`})
        })
    })
}

module.exports = {
    updateSbc: updateSbc,
    getSbcs: getSbcs,
    createEmptySbc: createEmptySbc,
    deleteSbc: deleteSbc,
    endPool: endPool,
}