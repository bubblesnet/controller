
const fs = require('fs');

global.localconfig = {}

try {

    const data = fs.readFileSync('./config.json', 'utf8');

    // parse JSON string to JSON object
    localconfig = JSON.parse(data);


} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}

(function () {
    exports.getLocals = function () {
        return (localconfig)
    };
}).call(this);