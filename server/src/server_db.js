const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: '192.168.21.237',
    database: process.env.ICEBREAKER_DB,
    password: 'postgres',
    port: 5432,
});

const getPool = () => {
    return(pool)
}

module.exports = {
    getPool: getPool,
}