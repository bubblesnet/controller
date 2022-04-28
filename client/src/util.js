/*
 * Copyright (c) John Rodley 2022.
 * SPDX-FileCopyrightText:  John Rodley 2022.
 * SPDX-License-Identifier: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Normalize a port into a number, string, or false.
 */

const fs = require('fs')
const log = require("roarr");


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
            ports.websocket_server_port = 8001;
            ports.activemq_server_port = 61613;
            ports.api_server_host = '192.168.21.237';
            ports.websocket_server_host = '192.168.21.237';
            ports.activemq_server_host = '192.168.21.237';
            if( process.env.REACT_APP_DEV_HOST !== "" ) {
                ports.api_server_host = process.env.REACT_APP_DEV_HOST;
                ports.websocket_server_host = process.env.REACT_APP_DEV_HOST;
                ports.activemq_server_host = process.env.REACT_APP_DEV_HOST;
            }
            break;
        case "TEST":
            ports.api_server_port = 3002;
            ports.api_server_host = '192.168.21.237';
            ports.websocket_server_host = '192.168.21.237';
            ports.websocket_server_port = 8002;
            ports.activemq_server_port = 61613;
            ports.activemq_server_host = '192.168.21.237';
            if( process.env.REACT_APP_TEST_HOST !== "" ) {
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
        default:
            ports.api_server_port = 3003;
            ports.websocket_server_port = 8001;
            ports.activemq_server_port = 61613;
            ports.api_server_host = '192.168.21.237';
            ports.websocket_server_host = '192.168.21.237';
            ports.activemq_server_host = '192.168.21.237';
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
    log.trace("Reading config from " + filepath)
    const data = fs.readFileSync(filepath, 'utf8');
    // parse JSON string to JSON object
    return(JSON.parse(data));
}

module.exports = {
    get_server_ports_for_environment,
    normalizePort: normalizePort,
    readJsonFile:readJsonFile,
    getRandomInt: getRandomInt
};
