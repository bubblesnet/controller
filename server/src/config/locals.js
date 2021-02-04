
const fs = require('fs');
let configFilePath = './config.json'

global.localconfig = { bubbles_db_config: {}}

function reloadLocals(filepath) {
        console.log("Reading config from " + filepath)
        const data = fs.readFileSync(filepath, 'utf8');
        // parse JSON string to JSON object
        localconfig = JSON.parse(data);
}

reloadLocals(configFilePath);

function getLocals () {
    return (localconfig)
}


module.exports = {
    getLocals: getLocals,
    reloadLocals: reloadLocals
}