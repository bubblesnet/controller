const locals = require("../../config/locals");
const db = require("./bubbles_db");


const findOne = (email_address, cb) => {
    let user = {
        found: true,
        email: email_address,
        name: "John Rodley",
        password: "xyz1234"
    }
    cb( null, user )
}

module.exports = {
    findOne: findOne,
}
