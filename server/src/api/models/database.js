const locals = require("../../config/locals");
const createConnectionPool = require('@databases/pg');

const db = createConnectionPool(locals.getLocals(true).bubbles_db_config);
module.exports = db;