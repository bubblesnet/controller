
const fs = require('fs');
global.configFilePath = './config.json'

global.localconfig = { bubbles_db_config: {}}

function reloadLocals() {
    try {

        const data = fs.readFileSync(configFilePath, 'utf8');

        // parse JSON string to JSON object
        localconfig = JSON.parse(data);


    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
}

reloadLocals();

(function () {
    exports.getLocals = function () {
        return (localconfig)
    }
    exports.reloadLocals = reloadLocals;
}).call(this);