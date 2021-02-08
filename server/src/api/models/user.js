const locals = require("../../config/locals");
const bcrypt = require('bcryptjs');

const server_db = require('./bubbles_db')
const pool = server_db.getPool()
const endPool = () => {
    pool.end()
}

/*
const getUser = (email_address, cb) => {
    let user = {
        found: true,
        email: email_address,
        name: "John Rodley",
        password: "xyz1234"
    }
    cb( null, user )
}

 */

async function getAllUsers() {
    console.log("user_model getUsers")
    return new Promise(function (resolve, reject) {
        let ssql = "select * from public.user order by lastname asc, firstname asc, email asc"
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

async function findOneByUsername(username) {
    console.log("findOneByUsername")
    return new Promise(function (resolve, reject) {
        console.log("username = " + username)
        let ssql = 'select * from public.user where username = $1 order by lastname asc, firstname asc, email asc'
        console.log("ssql = "+ssql)
        let values = [username]
        pool.query(ssql, values, (err, results) => {
            console.log("callback from findOne with err " + err + " results " + results)
            if (err) {
                console.error("findOne error " + err)
                reject(err)
            }
            else if (results && results.rowCount > 0) {
                console.log("resolving with results row 0 = " + JSON.stringify(results.rows[0]))
                resolve(results.rows[0]);
            } else {
                //               reject("no data")
                console.log("no user found at username " + username)
                resolve(null);
            }
        })
    })
}

async function findOneByUserid(userid) {
    console.log("findOneByUserid")
    return new Promise(function (resolve, reject) {
        console.log("userid = " + userid)
        let ssql = 'select * from public.user where userid = $1 order by lastname asc, firstname asc, email asc'
        console.log("ssql = "+ssql)
        let values = [userid]
        pool.query(ssql, values, (err, results) => {
            console.log("callback from findOne with err " + err + " results " + results)
            if (err) {
                console.error("findOne error " + err)
                reject(err)
            }
            else if (results && results.rowCount > 0) {
                console.log("resolving with results row 0 = " + JSON.stringify(results.rows[0]))
                resolve(results.rows[0]);
            } else {
                //               reject("no data")
                console.log("no user found at userid " + userid)
                resolve(null);
            }
        })
    })
}


async function createEmptyUser(body) {
    return new Promise(function(resolve, reject) {
        console.log("inserting new USER "+JSON.stringify(body))
        pool.query("INSERT INTO public.user (username,firstname,lastname,email,passwordhash) VALUES ('','','','','') RETURNING *", [], (error, results) => {
            if (error) {
                reject(error)
            } else {
                console.log("new userid " + results.rows[0])
                resolve({userid: results.rows[0].userid, message: "A new user has been added :" + results.rows[0].userid})
            }
        })
    })
}

/*
        userid_User: x.userid,
        useemailforsecurity: true,
        usesmsforsecurity: true,
        useemailforplantprogress: true,
        usesmsforplantprogress: true,
        useemailformaintenancerequired
        usesmsformaintenancerequired: true,
        useemailforinformation: true,
        usesmsforinformation: true,

 */
async function createSettings(body) {
    return new Promise(function(resolve, reject) {
        pool.query("INSERT INTO usersettings (userid_User,useemailforsecurity, usesmsforsecurity, useemailforplantprogress," +
            "usesmsforplantprogress, useemailformaintenancerequired, usesmsformaintenancerequired,useemailforinformation,usesmsforinformation ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)" +
            " RETURNING *",
            [body.userid, body.useemailforsecurity, body.usesmsforsecurity, body.useemailforplantprogress, body.usesmsforplantprogress, body.useemailformaintenancerequired,
            body.usesmsformaintenancerequired, body.useemailforinformation, body.usesmsforinformation], (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    console.log("new usersettings " + JSON.stringify(results.rows[0]))
                    resolve({usersettingsid: results.rows[0].usersettingsid, message: "A new usersettings has been added :" + results.rows[0].usersettingsid})
                }
            })
    })
}

async function createUser(body) {
    return new Promise(function(resolve, reject) {
        pool.query("INSERT INTO public.user (username, firstname,lastname,email,passwordhash,created) VALUES ($1,$2,$3,$4,$5,current_timestamp) RETURNING *",
            [body.username, body.firstname, body.lastname, body.email, body.passwordhash], (error, results) => {
            if (error) {
                reject(error)
            } else {
                console.log("new userid " + results.rows[0])
                resolve({userid: results.rows[0].userid, message: "A new user has been added :" + results.rows[0].userid})
            }
        })
    })
}

async function updateUser(body) {
    body.passwordhash = bcrypt.hashSync(body.password, 8);
    return new Promise(function(resolve, reject) {
        pool.query("UPDATE public.user set firstname=$1,lastname=$2,passwordhash=$3, email=$4 where userid=$5 RETURNING *",
            [body.firstname, body.lastname, body.passwordhash, body.email, body.userid], (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    console.log("updated email " + body.email)
                    resolve({userid: results.rows[0].userid, message: "user has been modified :" + results.rowCount})
                }
            })
    })
}


async function updateSingleUserField(body) {
    console.log('updateSingleUserField')
    console.log("body = " + JSON.stringify(body))
    console.log(' typeof(body.value) = ' + typeof (body.value))
    return new Promise(function (resolve, reject) {
            console.log('UPDATE public.user SET ' + body.fieldname + '= ' + body.value + ' WHERE userid = ' + body.userid)
//                pool.query(`UPDATE public.user SET ${body.fieldname} = '${body.value}' WHERE userid = ${body.userid}`, (error, results) => {
            pool.query(`UPDATE public.user SET ${body.fieldname} = $1 WHERE userid = $2`,
                [body.value, body.userid], (error, results) => {
                    if (error) {
                        console.error("updateSingleUserField err1 " + error)
                        reject(error)
                    } else {
                        resolve({userid: body.userid, message: 'user id ' + body.userid + ' has been updated'})
                    }
                })
        }
    );
}

async function setPassword(userid, plaintext_password) {
    let passwordhash = bcrypt.hashSync(plaintext_password, 8);
    console.log("plaintext = " + plaintext_password+" hash = "+passwordhash)
    return await updateSingleUserField({userid: userid, fieldname: 'passwordhash', value: passwordhash})
}

async function deleteUser(id) {
    console.log("deleteUser "+id)
    return new Promise(function(resolve, reject) {
        const userid = parseInt(id)
        console.log("DELETE FROM public.user WHERE userid "+userid)

        pool.query('DELETE FROM public.user WHERE userid = $1', [userid], (error, results) => {
            if (error) {
                console.error("deleteUser err3 " + error)
                reject(error)
            } else {
//                console.log("results " + JSON.stringify(results))
                resolve({userid: id, message: 'USER deleted with ID ' + userid})
            }
        })
    })
}

function getUserSettings (userid, cb) {
    console.log("user.getUserSettings " + userid);
    return pool.query('select * from usersettings where userid_user = $1', [userid], function (err, result) {
//        console.log('getUserSettings err ' + err + ' result ' + result);
//        console.log('getUserSettings results = ' + JSON.stringify(result));
//        if (err === null) {
            return cb(err, result);
//        }
    });
}

module.exports = {
    updateSingleUserField: updateSingleUserField,
    getAllUsers: getAllUsers,
    createEmptyUser: createEmptyUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    setPassword: setPassword,
    endPool: endPool,
//    getUser: getUser,
    findOneByUsername: findOneByUsername,
    findOneByUserid: findOneByUserid,
    createSettings: createSettings,
    getUserSettings
}

