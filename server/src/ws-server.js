global.__root   = __dirname + '/';
const util = require('./util')

ports = util.get_server_ports_for_environment( process.env.NODE_ENV )

const wsu = require('./ws-server-utils')

// noinspection JSIgnoredPromiseFromCall
try {
    x = wsu.serveUIWebSockets(ports.websocket_server_port, wsu.ui_service_callback);
} catch(err) {
    console.error("ws-server error " + err)
}
