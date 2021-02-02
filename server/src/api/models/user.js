const locals = require("../../config/locals");
const bcrypt = require('bcryptjs');

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

async function getAllUsers() {
    console.log("user_model getUsers")
    return new Promise(function (resolve, reject) {
        let ssql = "select * from user order by lastname asc, firstname asc, email asc"
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

async function findOne(email) {
    console.log("findOne")
    return new Promise(function (resolve, reject) {
        let ssql = 'select * from public.user where email = $1 order by lastname asc, firstname asc, email asc'
        console.log("ssql = "+ssql)
        let values = [email]
        pool.query(ssql, values, (error, results) => {
            if (error) {
                reject(error)
            }
            if (results) {
                 resolve(results.rows[0]);
            } else {
                //               reject("no data")
                reject("no user found at email " + email);
            }
        })
    })
}


async function createEmptyUser(body) {
    return new Promise(function(resolve, reject) {
        console.log("inserting new USER "+JSON.stringify(body))
        pool.query("INSERT INTO public.user (firstname,lastname,email,passwordhash) VALUES ('','','','') RETURNING *", [], (error, results) => {
            if (error) {
                reject(error)
            } else {
                console.log("new userid " + results.rows[0])
                resolve({userid: results.rows[0].userid, message: "A new user has been added :" + results.rows[0].userid})
            }
        })
    })
}

async function createUser(body) {
    return new Promise(function(resolve, reject) {
        console.log("inserting new USER "+JSON.stringify(body))
        let passwordhash = bcrypt.hashSync(body.password, 8);

        pool.query("INSERT INTO public.user (firstname,lastname,email,passwordhash) VALUES ($1,$2,$3,$4) RETURNING *",
            [body.firstname, body.lastname, body.email, passwordhash], (error, results) => {
            if (error) {
                reject(error)
            } else {
                console.log("new userid " + results.rows[0])
                resolve({userid: results.rows[0].userid, message: "A new user has been added :" + results.rows[0].userid})
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
                        console.log("err1 " + error)
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
        console.log("DELETE FROM user WHERE userid "+userid)

        pool.query('DELETE FROM user WHERE userid = $1', [userid], (error, results) => {
            if (error) {
                console.log("err3 " + error)
                reject(error)
            } else {
                console.log("results " + JSON.stringify(results))
                resolve({userid: id, message: 'USER deleted with ID ' + userid})
            }
        })
    })
}

module.exports = {
    updateSingleUserField: updateSingleUserField,
    getAllUsers: getAllUsers,
    createEmptyUser: createEmptyUser,
    createUser: createUser,
    deleteUser: deleteUser,
    setPassword: setPassword,
    endPool: endPool,
    getUser: getUser,
    findOne: findOne
}

