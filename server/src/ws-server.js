global.__root   = __dirname + '/';

let api_server_port = 0;
let websocket_server_port = 0;

switch( process.env.NODE_ENV ) {
    case "DEV":
        api_server_port = 3003;
        websocket_server_port = 8001;
        break;
    case "TEST":
        api_server_port = 3002;
        websocket_server_port = 8002;
        break;
    case "PRODUCTION":
        api_server_port = 3001;
        websocket_server_port = 8003;
        break;
    case "CI":
        api_server_port = 3004;
        websocket_server_port = 8004;
        break;
}

const wsu = require('./ws-server-utils')

// noinspection JSIgnoredPromiseFromCall
x = wsu.serveUIWebSockets(websocket_server_port);
