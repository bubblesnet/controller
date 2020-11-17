const locals = require("../../config/locals");


const Pool = require('pg').Pool

console.log('Creating initial bubbles database connection to '+JSON.stringify(locals.getLocals().bubbles_db_config));

let pool = new Pool(locals.getLocals().bubbles_db_config);

const getPool = () => {
    return(pool)
}

module.exports = {
    getPool: getPool,
}