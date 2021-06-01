/**
 * Normalize a port into a number, string, or false.
 */

const fs = require('fs')

function get_config_file_for_environment(env) {
    switch(env) {
        case "DEV":
            return("config_dev.json")
            break;
        case "TEST":
            return("config_test.json")
            break;
        case "PRODUCTION":
            return("config.json")
            break;
        case "CI":
            return("config_ci.json")
            break;
    }
    return( '' )
}


function get_server_ports_for_environment(env) {
    let ports = {
        api_server_port: 0,
        api_server_host: '',
        websocket_server_host: '',
        websocket_server_port: 0,
        activemq_server_port: 0,
        activemq_server_host: ''
    };

    switch(env) {
        case "DEV":
            ports.api_server_port = 3003;
            ports.api_server_host = '192.168.21.237';
            ports.websocket_server_host = '192.168.21.237';
            ports.websocket_server_port = 8001;
            ports.activemq_server_port = 61613;
            ports.activemq_server_host = '192.168.21.237';
            if( process.env.DEV_HOST !== "" ) {
                ports.api_server_host = process.env.DEV_HOST;
                ports.websocket_server_host = process.env.DEV_HOST;
                ports.activemq_server_host = process.env.DEV_HOST;

            }
            break;
        case "TEST":
            ports.api_server_port = 3002;
            ports.websocket_server_port = 8002;
            ports.activemq_server_port = 61613;
            ports.api_server_host = '192.168.21.237';
            ports.websocket_server_host = '192.168.21.237';
            ports.activemq_server_host = '192.168.21.237';
            if( process.env.TEST_HOST !== "" ) {
                ports.api_server_host = process.env.TEST_HOST;
                ports.websocket_server_host = process.env.TEST_HOST;
                ports.activemq_server_host = process.env.TEST_HOST;
            }
            break;
        case "PRODUCTION":
            ports.api_server_port = 3001;
            ports.api_server_host = '192.168.21.204';
            ports.websocket_server_host = '192.168.21.204';
            ports.websocket_server_port = 8003;
            ports.activemq_server_port = 61613;
            ports.activemq_server_host = '192.168.21.204';
            break;
        case "CI":
            ports.api_server_port = 3004;
            ports.api_server_host = 'localhost';
            ports.websocket_server_host = 'localhost';
            ports.websocket_server_port = 8004;
            ports.activemq_server_port = 61613;
            ports.activemq_server_host = 'localhost';
            break;
    }
    return( ports)
}
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
    console.log("utils.readJsonFile Reading config from " + filepath)
    const data = fs.readFileSync(filepath, 'utf8');
    // parse JSON string to JSON object
    return(JSON.parse(data));
}

module.exports = {
    get_config_file_for_environment,
    get_server_ports_for_environment,
    normalizePort: normalizePort,
    readJsonFile:readJsonFile,
    getRandomInt: getRandomInt
};
