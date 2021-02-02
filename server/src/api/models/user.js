const locals = require("../../config/locals");

const server_db = require('./bubbles_db')
const pool = server_db.getPool()
const endPool = () => {
    pool.end()
}

const getUser = (email_address, cb) => {
    let user = {
        found: true,
        email: email_address,
        name: "John Rodley",
        password: "xyz1234"
    }
    cb( null, user )
}

const getAllUsers = () => {
    console.log("user_model getUsers")
    return new Promise(function (resolve, reject) {
        let ssql = "select * from user "
            + " order by lastname asc, firstname asc, email asc"
        pool.query(ssql, (error, results) => {
            if (error) {
                reject(error)
            }
            if (results) {
                for( let i = 0; i < results.rows.length; i++ ) {
                    results.rows[i].port = process.env.PORT
                    results.rows[i].database = process.env.ICEBREAKER_DB
                }
                //               console.log("users " + results)
                resolve(results.rows);
            } else {
                //               reject("no data")
                resolve({results: []});
            }
        })
    })
}

function createEmptyUser(body) {
    return new Promise(function(resolve, reject) {
        console.log("inserting new USER "+JSON.stringify(body))
        pool.query("INSERT INTO user (firstname,lastname,email) VALUES ('','','') RETURNING *", [], (error, results) => {
            if (error) {
                reject(error)
            }
            console.log("new userid " + results.rows[0])
            resolve({userid: results.rows[0], message: "A new user has been added added:"+results.rows[0]})
        })
    })
}

function updateSingleUserField(body) {
        console.log('updateUser')
        console.log("body = "+body)
        ssql = 'UPDATE user SET '+body.fieldname+' = '+body.value+' WHERE userid='+body.userid;
        console.log(ssql)
        console.log(' typeof(body.value) = ' +  typeof(body.value))
        if( typeof(body.value) === "string") {
            pool.query(`UPDATE user SET ${body.fieldname} = '${body.value}' WHERE userid = ${body.userid}`, (error, results) => {
                if (error) {
                    console.log(error)
                    throw(error)
                }
                return({userid: body.userid, message: 'user id ' + body.userid + ' has been updated'})
            })

        } else {
            pool.query(`UPDATE user SET ${body.fieldname} = ${body.value} WHERE userid = ${body.userid}`, (error, results) => {
                if (error) {
                    console.log(error)
                    throw(error)
                }
                return({userid: body.userid, message: 'user id ' + body.userid + ' has been updated'})
            })
        }
}


const deleteUser = (id) => {
    console.log("deleteUser "+id)
    return new Promise(function(resolve, reject) {
        const userid = parseInt(id)
        console.log("DELETE FROM user WHERE userid "+userid)

        pool.query('DELETE FROM user WHERE userid = $1', [userid], (error, results) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            console.log("results "+JSON.stringify(results))
            resolve({ message: `USER deleted with ID`})
        })
    })
}

module.exports = {
    updateSingleUserField: updateSingleUserField,
    getAllUsers: getAllUsers,
    createEmptyUser: createEmptyUser,
    deleteUser: deleteUser,
    endPool: endPool,
    getUser: getUser,
}

