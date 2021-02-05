/**
 * Normalize a port into a number, string, or false.
 */

const fs = require('fs')

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function readJsonFile(filepath) {
    console.log("Reading config from " + filepath)
    const data = fs.readFileSync(filepath, 'utf8');
    // parse JSON string to JSON object
    return(JSON.parse(data));
}

module.exports = {
    normalizePort: normalizePort,
    readJsonFile:readJsonFile,
    getRandomInt: getRandomInt
};
