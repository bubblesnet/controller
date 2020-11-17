const locals = require("../../config/locals");


const Pool = require('pg').Pool

console.log('Creating initial icebreaker database connection to '+JSON.stringify(locals.getLocals().icebreaker_db_config));

let pool = new Pool(locals.getLocals().icebreaker_db_config);

const getPool = () => {
    return(pool)
}

module.exports = {
    getPool: getPool,
}