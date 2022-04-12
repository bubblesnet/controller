
const util = require('../util')
const fs = require('fs');
let configFilePath = './config.json'

global.localconfig = { bubbles_db_config: {}}

function reloadLocals(filepath) {
        console.log("locals.reloadLocals Reading config from " + filepath)
        const data = fs.readFileSync(filepath, 'utf8');
        // parse JSON string to JSON object
        global.localconfig = JSON.parse(data);
}

function getLocals (force_reload) {
    if( force_reload === true ) {
        configFilePath = util.get_config_file_for_environment(process.env.NODE_ENV)
        reloadLocals(configFilePath);
        console.log("using database "+global.localconfig.bubbles_db_config.database)
    }
    return (global.localconfig)
}


module.exports = {
    getLocals: getLocals,
    reloadLocals: reloadLocals
}