/**
 * Normalize a port into a number, string, or false.
 */

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



module.exports = {
    normalizePort: normalizePort,
    getRandomInt: getRandomInt
};
